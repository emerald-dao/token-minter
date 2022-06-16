import Papa from 'papaparse';

// TODO: Add validation for file drop
export const validateCSV = async (dataTransfer) => {
  if (dataTransfer.items) {
    if (dataTransfer.items.length === 1) {
      const item = dataTransfer.items[0];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file && file.type === 'text/csv') {
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
        }
      }
    }
  }
};

export const validateImages = (dataTransfer) => {
  return true;
};

export const crossCheckValidation = (csvFile, imagesFiles) => {
  return true;
};
