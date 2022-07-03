import { csvMetadata } from '$lib/stores/generator/CsvStore.ts';
import { saveFileInStore } from '$lib/stores/generator/updateFunctions';


// This validations are called at the moment of file drop
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

    const required = ['name', 'description', 'image'];
    if (attributes.includes('thumbnail')) required.push('thumbnail');

    let usedKeys = {};
    // parse the metadata for each NFT into a dictionary, keyed by its unique name

    let metadata = {};
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
        // validate key (present and non-duplicate)
        if (!key) {
          trackedErrors.push('ERROR: Name attribute missing');
        }
        if (usedKeys[key]) {
          // ERROR: occupied, this name has already been used!
          trackedErrors.push(`ERROR: Name attribute must be unique: ${key}`);
        } else {
          usedKeys[key] = key; // mark as used
          metadata[key] = nft_attribs;
        }

        // check for all required attributes
        required.forEach((k) => {
          if (!nft_attribs[k]) {
            trackedErrors.push(`ERROR: Required attribute ${k} missing in ${key}`);
          }
        });
      } else {
        trackedErrors.push(`ERROR: Malformed record`);
      }
      return trackedErrors;
    }, []);

    console.log('errs', errs)

    if (errs.length === 0) {
      saveFileInStore(csvMetadata, metadata);
      return true;
    } else {
      return {
        error: 'Errors encountered in CSV records',
        errs,
      };
    }
  } else {
    return {
      error: `The following attributes are required: ${required}`,
    };
  }
};

export const validateImages = (dataTransfer) => {
  return true;
};
