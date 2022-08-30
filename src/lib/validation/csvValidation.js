import { crossCheckValidation } from '$lib/validation/crossCheckValidation';
import { imagesStore } from '$stores/CollectionFilesStore';
import Papa from 'papaparse';
import { get } from 'svelte/store';
import getFilesFromData from '$lib/utilities/getFilesFromData';

export const csvValidation = async (data) => {
  const files = getFilesFromData(data);

  // Run a first validation to see if the file is a CSV file
  const beforeParseValidationResult = validateCsvBeforeParse(files);

  if (beforeParseValidationResult === true) {
    // If the file is a CSV file: we parse the file and run a second validation
    const file = files.source === 'input' ? files.list[0] : files.list[0].getAsFile();
    let parsedCSV;
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function () {
        const pt = Papa.parse(reader.result);
        parsedCSV = pt.data;
        resolve();
      };
      reader.readAsBinaryString(file);
    }).then(() => {
      // After parse, we run second validation
      const afterParseValidationResult = validateCsvAfterParse(parsedCSV);

      if (afterParseValidationResult.validation === true) {
        if (get(imagesStore).files.length > 0) {
          // If the validation successful and the images are already uploaded: we run the cross check validation
          const crossedValidationResult = crossCheckValidation(
            parsedCSV,
            afterParseValidationResult.metadata,
            get(imagesStore).files
          );
          if (crossedValidationResult === true) {
            // If the cross check validation successful: we return the files
            return {
              validation: true,
              files: [file],
              parsedFiles: parsedCSV,
              metadata: afterParseValidationResult.metadata,
            };
          } else {
            // If the cross check validation failed: we set the error message
            return {
              validation: false,
              errors: crossedValidationResult.error,
            };
          }
        } else {
          // If images are not uploaded yet: we save our files and update validation state
          return {
            validation: true,
            files: [file],
            parsedFiles: parsedCSV,
            metadata: afterParseValidationResult.metadata,
          };
        }
      } else {
        // If the validation failed: we set the error message and set state to 'invalid'
        return {
          validation: false,
          errors: afterParseValidationResult.error,
        };
      }
    });
  } else {
    // If the validation failed: we set the error message and set state to 'invalid'
    return {
      validation: false,
      errors: beforeParseValidationResult.error,
    };
  }
};

// This validations are called at the moment of file drop
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error

// The initial validation occurs before the file is parsed.
const validateCsvBeforeParse = (files) => {
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
const validateCsvAfterParse = (parsedCsv) => {
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

    if (errs.length === 0) {
      // saveFileInStore(csvMetadata, metadata);
      return {
        validation: true,
        metadata: metadata,
      };
    } else {
      console.log('errs', errs);
      return {
        validation: false,
        error: 'Errors encountered in CSV records',
        errs,
      };
    }
  } else {
    return {
      validation: false,
      error: `The following attributes are required: name, description, image`,
    };
  }
};
