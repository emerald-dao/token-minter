// This validations are called at the moment of file drop.
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

import Papa from 'papaparse';

// The initial validation occurs before the file is parsed.
export const validateCsvBeforeParse = (dataTransfer) => {
  if (dataTransfer.items) {
    if (dataTransfer.items.length === 1) {
      const item = dataTransfer.items[0];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file && file.type === 'text/csv') {
          return true;
        } else {
          return {
            error: 'Invalid file type',
          };
        }
      }
    }
  }
};

// The final validation occurs before the file is parsed.
export const validateCsvAfterParse = async (parsedCsv) => {
  const metadata = {
    attributes: [],
    nft_data: []
  };
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function () {
      const pt = Papa.parse(reader.result);
      metadata.attributes = pt.data[0];
      resolve();
    };
    reader.readAsBinaryString(file);
  }).then(() => {
    const attributes = metadata.attributes;
    // validation rules: 
    // 1) the CSV must include 'name', 'description', and 'image' attributes
    // 2) the 'thumbnail' field is optional, but if present, must be used in all records
    if (attributes.includes('name') && attributes.includes('description') && attributes.includes('image')) {

      // the cross-check validation needs to know which IPFS assets have been declared (image or image+thumbnail)
      // this approach was designed for arbitrary number of items--maybe a bit overkill for 1 or 2 ;)
      attributes.asset_keys = ['image'];
      if( attributes.includes('thumbnail') ) attributes.asset_keys.push[ 'thumbnail' ];

      // parse the metadata for each NFT into a dictionary, keyed by its unique name
      metadata.nft_data = pt.data.slice(1).reduce( (a, vals)=>{

        // values are in an ordered array corresponding to the metadata.attributes array 
        if( vals && vals.length > 0 && vals[0] !== '' ){
            let nft_attribs = {};
            for( let i=0; i < metadata.attributes.length; i++ ){

              // put values into the dict
              nft_attribs[ metadata.attributes[i] ] = vals[ i ];

              // catch the unique identifier of this NFT (name):
              if( metadata.attributes[i] === 'name' ){ key = f[ i ]; }
            }
            if( a[ key ] ){
              // ERROR: occupied, this name has already been used!
            } else {
              a[ key ] = { data: nft_attribs, status: 0 };
            }
        } else {
          // ERROR: empty row, or content is not an array of values
        }
        return a;
      }, { } );

      // TODO: put the final metadata into Svelte store
      return true;
    }
  });
};

export const validateImages = (dataTransfer) => {
  return true;
};
