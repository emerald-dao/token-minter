// Validation that runs once both files are dropped and independently validated
export const crossCheckValidation = ( metadata, imagesFiles) => {

    //---- check for errors in metadata: a) files w/ no metadata (orphans) or b) metadata w/ no file (ghosts)
    for( const key in metadata.nft_data ){
        let item = metadata.nft_data[ key ]
        for( const k of metadata.asset_keys ){
            if( imageFiles[ item.data[ k ] ] ){
              imageFiles[ item.data[ k ] ] = OK;  // mark the file as referenced
            } else {
              let msg = item.data[ k ]? 'FILE NOT FOUND' : 'NO FILE REFERENCED';
              console.log( `WARNING: ${msg} for item: ${item.data.name}.${k}` );
            }
        }
        // The following lines would request a hash of this NFT's metadata FROM FLOW and add it to a library of hashcodes for the set
        // let digest = await get_digest_from_flow( item, metadata.attributes );
        // metadata_hash_lib[ item.data.serial ] = digest;
    }
    for( const k in imageFiles ){
      if( imageFiles[ k ] != OK ) console.log( `WARNING: ASSET FILE NOT REFERENCED BY ANY NFT: ${k}` );
    }



  return true;
};
