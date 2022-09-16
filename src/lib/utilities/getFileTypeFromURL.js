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
    const extension = url.pathname.split('.').pop();

    const fileType = types.get(extension);
    return fileType;
  } catch (_) {
    return 'image';
  }
};

export default getFileTypeFromURL;
