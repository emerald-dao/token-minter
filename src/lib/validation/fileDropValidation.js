import { csvMetadata } from '$lib/stores/generator/CsvStore.ts';
import { saveFileInStore } from '$lib/stores/generator/updateFunctions';

// This validations are called at the moment of file drop
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

// The initial validation occurs before the file is parsed.
export const validateCsvBeforeParse = (files) => {
  if (files.list) {
    if (files.list.length === 1) {
      const file = files.source === 'input' ? files.list[0] : files.list[0].getAsFile();
      if (file && file.type === 'text/csv') {
        return true;
      } else {
        return {
          error: 'Invalid file type',
        };
      }
    } else {
      return {
        error: 'Too many files',
      };
    }
  } else {
    return {
      error: 'No files',
    };
  }
};

// The final validation occurs after the file is parsed.
export const validateCsvAfterParse = (parsedCsv) => {
  const attributes = parsedCsv[0];
  if (attributes.includes('name') && attributes.includes('description') && attributes.includes('image')) {
    const required = ['name', 'description', 'image'];
    if (attributes.includes('thumbnail')) required.push('thumbnail');

    // parse the metadata for each NFT into a dictionary
    let metadata = [];
    const errs = parsedCsv.slice(1).reduce((trackedErrors, vals) => {
      // values must be an ordered array corresponding to the metadata.attributes array
      if (vals && vals.length > 0 && vals[0] !== '') {
        let key; // this is the name
        let nft_attribs = {};
        for (let i = 0; i < attributes.length; i++) {
          const attribute = attributes[i];
          const attributeValue = vals[i];
          // put values into the dict
          nft_attribs[attribute] = attributeValue;

          // catch the unique identifier of this NFT (name):
          if (attribute === 'name') {
            key = attributeValue;
          }
        }

        metadata.push(nft_attribs);

        // check for all required attributes
        required.forEach((k) => {
          if (!nft_attribs[k]) {
            trackedErrors.push(`ERROR: Required attribute ${k} missing in ${key}`);
          }
        });
      }
      return trackedErrors;
    }, []);

    console.log(metadata);

    if (errs.length === 0) {
      saveFileInStore(csvMetadata, metadata);
      return true;
    } else {
      console.log('errs', errs);
      return {
        error: 'Errors encountered in CSV records',
        errs,
      };
    }
  } else {
    return {
      error: `The following attributes are required: name, description, image`,
    };
  }
};

export const validateImages = (files) => {
  return true;
};
