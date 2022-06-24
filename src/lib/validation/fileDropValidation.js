// This validations are called at the moment of file drop.
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

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


// The final validation occurs after the file is parsed.
export const validateCsvAfterParse = (parsedCsv) => {
  const attributes = parsedCsv[0];
  if (attributes.includes('name') && attributes.includes('description') && attributes.includes('image')) {
    console.log('Metadata', attributes);

    const required = ['name','description','image'];
    if( attributes.includes('thumbnail') ) required.push( 'thumbnail');

    // parse the metadata for each NFT into a dictionary, keyed by its unique name
    const errs = parseCsv.slice(1).reduce( (a, vals)=>{

        // values must be an ordered array corresponding to the metadata.attributes array 
       if( vals && vals.length > 0 && vals[0] !== '' ){
            let key;
            let nft_attribs = {};
            for( let i=0; i < attributes.length; i++ ){
              // put values into the dict
              nft_attribs[ attributes[i] ] = vals[ i ];

              // catch the unique identifier of this NFT (name):
              if( attributes[i] === 'name' ){ key = f[ i ]; }
            }
            // validate key (present and non-duplicate)
            if( !key ){
                a.push( 'ERROR: Name attribute missing' );
            }
            if( a[ key ] ){
              // ERROR: occupied, this name has already been used!
               a.push( `ERROR: Name attribute must be unique: ${ key }` );
            } else {
              a[ key ] = key;  // mark as used
            }

            // check for all required attributes
            required.forEach( k =>{
                if( !nft_attribs[ k ] ){
                  a.push( `ERROR: Required attribute ${k} missing in ${key}` );
                }
            })

        } else {
           a.push( `ERROR: Malformed record` );
        }
        return a;
    }, { } );

    if( errs.length === 0 ){
      return true;
    } else {
      return {
        error: 'Errors encountered in CSV records',
        errs: errs
      }
    }
  } else {
    return {
      error: 'The following attributes are required: name, description, image',
    };
  }
};

export const validateImages = (dataTransfer) => {
  return true;
};
