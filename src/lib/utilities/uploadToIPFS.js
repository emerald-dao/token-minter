import { NFTStorage } from 'nft.storage';
import { packToBlob } from 'ipfs-car/pack/blob';
import { unpack } from 'ipfs-car/unpack';
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory';
import { TreewalkCarSplitter } from 'carbites/treewalk';

export async function uploadToIPFS(csvFile, imageFiles, IPFSToken) {
  const attributes = parseCsv[0];
  const metadata = { nft_data: {} };
  let n = 0;
  metadata.nft_data = parseCsv.slice(1).reduce((a, nft) => {
    a[nft['name']] = nft;
    a[nft['name']].serial = nft['name'].serial;
    ++n;
    return a;
  }, {});

  //---- add metadata to .car file
  //  NOTE: this may not be needed if all metadata is stored in the contract
  for (const key in nft_data) {
    let item = metadata.nft_data[key];
    car_files.push({ path: item.serial, content: JSON.stringify(item) }); //
  }

  //---- build .car file
  const car_files = imageFiles.reduce((a, file) => {
    a.push({ path: file.name, content: file });
    return a;
  }, []);

  const { root, car } = await packToBlob({
    input: car_files,
    blockstore: new MemoryBlockStore(),
  });

  //---- upload to IPFS
  let result_cid = await uploadCar(car, IPFSToken);
  if (result_cid === root.toString()) {
    //---- save the CID into the metadata.nft_data
    // TODO: need to pass CID with NFT metadata to the token minter
    for (const key in metadata.nft_data) {
      metadata.nft_data[key].cid = result_cid;
    }
  } else {
    error = 'ERROR: precomputed CID does not match CID from IPFS';
  }
}

async function uploadCar(car, IPFSToken) {
  IPFSToken =
    IPFSToken ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNjMjJlNDBBNDdiQWNBMmExMzUxOWM2RUZDODA3NEE0Mjg1YUE0RDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDkwODQ2NDUzMCwibmFtZSI6IlRva2VuTWludGVyVGVzdCJ9.Oe5zDWDgTCEyGV__QVbVEZ6CH1aegZh5u8hPOjrIuk8';

  const NFTStorageClient = new NFTStorage({ token: IPFSToken });
  const MaxCarSize1MB = 100000000;
  let cars = [];
  let result_cid = null;

  if (car.size <= MaxCarSize1MB) {
    cars.push(car);
  } else {
    // when size exceeds MaxCarSize1MB, split it into an AsyncIterable<Uint8Array>
    const splitter = new TreewalkCarSplitter(car, MaxCarSize1MB);
    for await (const smallCar of splitter.cars()) {
      for await (const chunk of smallCar) {
        cars.push(chunk);
      }
    }
  }

  for await (const c of cars) {
    result_cid = await NFTStorageClient.storeCar(c);
  }
  return result_cid;
}
