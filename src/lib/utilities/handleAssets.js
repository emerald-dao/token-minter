import Papa from 'papaparse'; // CSV parser
import { NFTStorage } from 'nft.storage';
import { packToBlob } from 'ipfs-car/pack/blob';
import { unpack } from 'ipfs-car/unpack';
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory';
import { TreewalkCarSplitter } from 'carbites/treewalk';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const OK = 1; // status: image file linked with metadata
const NOK = 2; // status: image file not linked with metadata
const MaxCar = 100000000; // car size 1MB max
const NFTStorageToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNjMjJlNDBBNDdiQWNBMmExMzUxOWM2RUZDODA3NEE0Mjg1YUE0RDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDkwODQ2NDUzMCwibmFtZSI6IlRva2VuTWludGVyVGVzdCJ9.Oe5zDWDgTCEyGV__QVbVEZ6CH1aegZh5u8hPOjrIuk8';
const NFTStorageClient = new NFTStorage({ token: NFTStorageToken });

function error(e) {
  console.log('error: ' + e);
}
function error_from_readentries(e) {
  console.log('error_from_readentries: ' + e);
}

async function hello_from_flow() {
  // just to see if we got Flow...
  let msg = 'hello';
  fcl.config().put('accessNode.api', 'https://access-testnet.onflow.org');
  msg = await fcl.query({
    cadence: `pub fun main(): String { let s:String = "With greetings from Flow!";  let digest = HashAlgorithm.SHA3_256.hash( s.utf8 );  return String.encodeHex( digest ); }`,
    //cadence: `pub fun main(): String { return "With greetings from Flow!"; }`
  });
  return msg;
}

async function get_digest_from_flow(item, attributes) {
  let sep = '';
  console.log('attributes ' + attributes);
  let vals = attributes.reduce((a, k) => {
    let v = isNaN(item.data[k]) ? item.data[k] : item.data[k].toString();
    a += sep + v;
    sep = '::';
    return a;
  }, '');

  const digest = await fcl.query({
    cadence: `
      pub fun main( metavals: String ): String { 
        let digest = HashAlgorithm.SHA3_256.hash( metavals.utf8 );  
        return String.encodeHex( digest ); 
      }
    `,
    args: (arg, t) => [arg(vals, t.String)],
  });
  return digest;
}

async function processItems(entry, path, metadata, asset_list, car_files) {
  if (entry.kind === 'file') {
    const file = await entry.getFile();
    if (file !== null) {
      if (file.name.match(/^meta.*\.csv$/)) {
        metadata = await processMetadataFile(path, file, metadata);
      } else {
        asset_list[file.name] = NOK;
        car_files.push({ path: file.name, content: file });
      }
    }
  } else if (entry.kind === 'directory') {
    for await (const handle of entry.values()) {
      metadata = await processItems(handle, 'assets', metadata, asset_list, car_files);
    }
  }
  return metadata;
}

async function processMetadataFile(path, file, metadata) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let text = e.target.result;
      let pt = Papa.parse(text);
      metadata.attributes = pt.data[0];
      for (let attr of metadata.attributes) {
        // determine which attributes reference media file names
        if (
          attr.toLowerCase().match(/^file/) ||
          attr.toLowerCase().match(/^image/) ||
          attr.toLowerCase().match(/thumbnail/)
        ) {
          metadata.carkeys.push(attr);
        }
      }
      metadata.nft_data = pt.data.slice(1).reduce((a, f) => {
        if (f && f.length > 0 && f[0] !== '') {
          let nft_attribs = {};
          let key = null;
          for (let i = 0; i < metadata.attributes.length; i++) {
            nft_attribs[metadata.attributes[i]] = f[i];
            if (metadata.attributes[i] === 'name') {
              key = f[i];
            }
          }
          if (!key) {
            console.log('nft metadata requires a name! f=' + JSON.stringify(f));
          } else if (metadata.nft_data[key]) {
            a[key] = { ...{ data: nft_attribs }, ...metadata.nft_data[key] };
          } else {
            a[key] = { data: nft_attribs, status: 0 };
          }
        }
        return a;
      }, {});
      resolve();
    };
    reader.readAsText(file);
  })
    .then(() => {
      return metadata;
    })
    .catch((e) => {
      console.log('ERROR: ' + e);
      return metadata;
    });
}

async function uploadCar(car) {
  let cars = [];
  let result_cid = null;

  if (car.size <= MaxCar) {
    cars.push(car);
  } else {
    const splitter = new TreewalkCarSplitter(car, MaxCar);
    for await (const smallCar of splitter.cars()) {
      for await (const chunk of smallCar) {
        // Each smallCar is an AsyncIterable<Uint8Array> of CAR data
        cars.push(chunk);
      }
    }
  }
  //--- upload car(s) to IPFS
  for await (const c of cars) {
    result_cid = await NFTStorageClient.storeCar(c);
  }
  return result_cid;
}

async function handleAssetFolderDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  //---- asset directory has been dropped: find and parse metadata file, set status on image files
  let metadata = { attributes: [], nft_data: {}, carkeys: [] };
  let asset_list = {};
  let car_files = [];
  let metadata_hash_lib = {};

  //---- first we're gonna inventory the files dropped (the dataTransfer.items)
  //     we use processItems()
  //     the first item will be the assets folder itself (directory)
  for (const item of e.dataTransfer.items) {
    if (item.kind === 'file') {
      // kind will be 'file' for files or directory
      const fshandle = await item.getAsFileSystemHandle();
      let md = await processItems(fshandle, null, metadata, asset_list, car_files);
      metadata = md || metadata;
    }
  }

  //---- check for errors in metadata: a) files w/ no metadata or b) metadata w/ no file
  for (const key in metadata.nft_data) {
    let item = metadata.nft_data[key];
    for (const n of metadata.carkeys) {
      if (asset_list[item.data[n]]) {
        asset_list[item.data[n]] = OK; // mark the file as referenced
        //item.assets[ n ] = OK;  // mark the metadata assets for this attribute as OK
      } else {
        let msg = item.data[n] ? 'FILE NOT FOUND' : 'NO FILE REFERENCED';
        console.log(`WARNING: ${msg} for item: ${item.data.name}.${n}`);
      }
    }
    let digest = await get_digest_from_flow(item, metadata.attributes);
    metadata_hash_lib[item.data.serial] = digest;
    console.log(`INFO: hash for item ${item.data.serial} = ${digest}`);
  }
  for (const k in asset_list) {
    if (asset_list[k] == NOK) console.log(`WARNING: ASSET FILE NOT REFERENCED BY ANY NFT: ${k}`);
  }

  //---- add metadata to .car file
  for (const key in metadata.nft_data) {
    let item = metadata.nft_data[key];
    car_files.push({ path: item.data.serial, content: JSON.stringify(item.data) }); //
  }

  //---- build .car file
  const { root, car } = await packToBlob({
    input: car_files,
    blockstore: new MemoryBlockStore(),
  });

  //---- upload to IPFS
  let result_cid = await uploadCar(car);
  if (result_cid !== root.toString()) {
    console.log('WARNING: precomputed CID does not match CID from IPFS');
  }
  //---- propagate the CID into the metadata.nft_data
  console.log('INFO: uploaded car file: CID=' + result_cid);
  for (const key in metadata.nft_data) {
    let item = metadata.nft_data[key];
    if (item.content && item.data) {
      item.data.cid = result_cid;
    }
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

async function make_div() {
  const div = document.createElement('div');
  let htm = `<p>Drop assets folder here.  Include "metadata.csv" and NFT image files</p><div id='drop_zone' class='dropDiv' style='border: 1px solid; height: 200px; width: 50%; background-color: powderblue;'></div>`;
  let flowhello = await hello_from_flow();
  htm += `<p>${flowhello}</p>`;
  div.innerHTML = htm;
  document.body.appendChild(div);
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleAssetFolderDrop, false);
}

make_div();
