const getFilesFromData = (data) => {
  // Data can come from a file-drop or from input field.
  // We have to manage both of them in different ways.
  // If data comes from a file-drop, we have to use the data.items method to get the files.
  // If data comes from input field, we have to use the data.files method to get the files.
  if (data.items) {
    return {
      source: 'drop',
      list: data.items,
    };
  } else {
    return {
      source: 'input',
      list: data.files,
    };
  }
};

export default getFilesFromData;
