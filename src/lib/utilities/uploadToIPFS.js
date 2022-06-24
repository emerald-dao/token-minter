export async function uploadToIPFS(csvFile, assets, IPFSToken) {

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

async function uploadCar( car ) {
    let cars = []
    let result_cid = null;

    if( car.size <= MaxCar ){
        cars.push( car );
    } else {
        const splitter = new TreewalkCarSplitter( car, MaxCar )
        for await ( const smallCar of splitter.cars() ) {
          for await (const chunk of smallCar) { // Each smallCar is an AsyncIterable<Uint8Array> of CAR data
              cars.push( chunk );
          }
        }
    }
    //--- upload car(s) to IPFS
    for await ( const c of cars ) {
        result_cid = await NFTStorageClient.storeCar( c )
    }
    return result_cid

}
