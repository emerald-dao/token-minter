// TODO: Add validation for file drop
export const validateCSV = (dataTransfer) => {
  if (dataTransfer.items) {
    if (dataTransfer.items.length === 1) {
      const item = dataTransfer.items[0];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          if (file.type === 'text/csv') {
            return true;
          }
        }
      }
    }
  }
};

export const validateImages = (dataTransfer) => {
  return true;
};
