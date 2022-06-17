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
    if (attributes.includes('name') && attributes.includes('description') && attributes.includes('image')) {
      console.log('Metadata', metadata);
      return true;
    }
  });
};

export const validateImages = (dataTransfer) => {
  return true;
};
