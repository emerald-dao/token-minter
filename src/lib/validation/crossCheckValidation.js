// Validation that runs once both files are dropped and independently validated
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

// TODO: implement cross check validation
export const crossCheckValidation = (parsedCsv, imagesFiles) => {

	//---- check for errors in metadata: metadata w/ no file (ghosts)
	let errs = parsedCsv.slice(1).reduce( (a, nft )=>{
	    for( const k of metadata.ipfs_keys ){
	        if( fileStats[ nft[ k ] ] ){
	          fileStats[ nft[ k ] ] = 1;  // mark the file as referenced
	        } else {
	          let msg = nft[ k ]? 'FILE NOT FOUND' : 'NO FILE REFERENCED';
	          a.push( `WARNING: ${msg} for item: ${nft.name}.${k}` );
	        }
	    }
	},[] );

	for( const fn in fileStats ){   // check for files w/ no metadata (orphans)
	  if( fileStats[ fn ] < 0 ){
	  		errs.push( `WARNING: ASSET FILE NOT REFERENCED BY ANY NFT: ${k}` );
	  }
	}

	if ( errs.length === 0 ) {
		return true;
	} else {
		return {
	  		error: 'The images and the CSV do not match',
	  		errs: errs
		};
	}

};
