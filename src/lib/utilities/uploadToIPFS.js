import { NFTStorage } from 'nft.storage';
import { packToBlob } from 'ipfs-car/pack/blob';
import { unpack } from 'ipfs-car/unpack';
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory';
import { TreewalkCarSplitter } from 'carbites/treewalk';
import { resultCID } from '$stores/IPFSstore';
import { contractInfo } from '$stores/ContractStore';
import { get } from 'svelte/store';

export async function uploadToIPFS(assets, imageFiles, IPFSToken) {
  //---- add metadata to .car file
  //  NOTE: this may not be needed if all metadata is stored in the contract
  const car_files = assets.reduce((a, item, index) => {
    a.push({ path: index.toString(), content: JSON.stringify(item) });
    return a;
  }, []);

  //---- build .car file
  imageFiles.forEach((imageFile) => {
    car_files.push({ path: imageFile.name, content: imageFile });
  });
  // Also upload the main image file for the collection
  const { image, bannerImage } = get(contractInfo);
  car_files.push({ path: image.name, content: image });
  if (bannerImage) {
    car_files.push({ path: bannerImage.name, content: bannerImage });
  }

  const { root, car } = await packToBlob({
    input: car_files,
    blockstore: new MemoryBlockStore(),
  });

  //---- upload to IPFS
  let result_cid = await uploadCar(car, IPFSToken);
  if (result_cid === root.toString()) {
    console.log('Resulting IPFS CID', result_cid);
    resultCID.set(result_cid);
    return true;
  } else {
    return {
      error: 'ERROR: precomputed CID does not match CID from IPFS',
    };
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
