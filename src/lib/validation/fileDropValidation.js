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
    return true;
  } else {
    return {
      error: 'The following attributes are required: name, description, image',
    };
  }
};

export const validateImages = (dataTransfer) => {
  return true;
};
