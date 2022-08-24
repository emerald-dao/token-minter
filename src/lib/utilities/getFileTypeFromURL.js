const types = new Map([
  ['jpg', 'img'],
  ['gif', 'img'],
  ['mp4', 'video'],
  ['3gp', 'video'],
  ['webm', 'video'],
]);

const getFileTypeFromURL = (urlPath) => {
  try {
    const url = new URL(urlPath);
    const extension = url.pathname.split('.')[1];

    const fileType = types.get(extension);
    return fileType;
  } catch (_) {
    return 'image';
  }
};

export default getFileTypeFromURL;
