import { csvMetadata } from '$lib/generator/stores/CsvStore';
import { get } from 'svelte/store';

// Validation that runs once both files are dropped and independently validated
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

// TODO: implement cross check validation
export const crossCheckValidation = (parsedCsv, files) => {
  	const attributes = parsedCsv[0];
  	const OK = 1, NOK = -1;
  	let ipfs_keys = ['image'];
  	if( attributes.includes('thumbnail') ) ipfs_keys.push('thumbnail');
  	let file_xcheck = files.reduce( (a,f)=>{
  		a[ f.name ] = NOK;
  		return a;
  	},{} );

	//---- check for errors in metadata: metadata w/ no file (ghosts)
	let metadata = get( csvMetadata );
	let errs = []; //parsedCsv.slice(1).reduce( (a, nft )=>{
	for( const n of Object.keys( metadata )){
		let nft = metadata[ n ];
	    for( const k of ipfs_keys ){
	        if( file_xcheck[ nft[ k ] ] ){
	          file_xcheck[ nft[ k ] ] = OK;  // mark the file as referenced
	        } else {
	          let msg = nft[ k ]? 'FILE NOT FOUND' : 'NO FILE REFERENCED';
	          errs.push( `WARNING: ${msg} for item: ${nft.name}.${k}` );
	        }
	    }
	}  //,[] );

	for( const fn in file_xcheck ){   // check for files w/ no metadata (orphans)
	  if( file_xcheck[ fn ] < 0 ){
	  		errs.push( `WARNING: Asset file not referenced by any NFT: ${fn}` );
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
