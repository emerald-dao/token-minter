import { NFTStorage } from "nft.storage"
import { packToBlob } from 'ipfs-car/pack/blob'
import { unpack } from 'ipfs-car/unpack'
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory'
import { TreewalkCarSplitter } from 'carbites/treewalk'


export async function uploadToIPFS( metadata, assets, IPFSToken) {
	
	let car_files = [];

    //---- add metadata to .car file
    for( const key in metadata.nft_data ){
        let item = metadata.nft_data[ key ]
        car_files.push( {  path: item.data.serial, content: JSON.stringify( item.data ) } );  // 
    }

    //---- build .car file
    const { root, car } = await packToBlob({
      input: car_files,
      blockstore: new MemoryBlockStore()
    })

    //---- upload to IPFS
    let result_cid = await uploadCar( car )
    if( result_cid !== root.toString() ){
        console.log( 'WARNING: precomputed CID does not match CID from IPFS' );
    }
    //---- propagate the CID into the metadata.nft_data
    console.log( 'INFO: uploaded car file: CID='+result_cid )
    for( const key in metadata.nft_data ){
        let item = metadata.nft_data[ key ]
        if( item.content && item.data ){
              item.data.cid = result_cid;
        }
    }

}


async function uploadCar( car, IPFSToken ) {

	IPFSToken = IPFSToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNjMjJlNDBBNDdiQWNBMmExMzUxOWM2RUZDODA3NEE0Mjg1YUE0RDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDkwODQ2NDUzMCwibmFtZSI6IlRva2VuTWludGVyVGVzdCJ9.Oe5zDWDgTCEyGV__QVbVEZ6CH1aegZh5u8hPOjrIuk8'

	const NFTStorageClient = new NFTStorage( { token: IPFSToken } );
	const MaxCarSize1MB = 100000000;
    let cars = []
    let result_cid = null;

    if( car.size <= MaxCarSize1MB ){
        cars.push( car );
    } else {
    	// when size exceeds MaxCarSize1MB, split it into an AsyncIterable<Uint8Array>
        const splitter = new TreewalkCarSplitter( car, MaxCarSize1MB )
        for await ( const smallCar of splitter.cars() ) {
          for await (const chunk of smallCar) {
              cars.push( chunk );
          }
        }
    }
    for await ( const c of cars ) {
        result_cid = await NFTStorageClient.storeCar( c )
    }
    return result_cid

}