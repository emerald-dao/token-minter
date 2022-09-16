import { crossCheckValidation } from '$lib/validation/crossCheckValidation';
import { csvStore } from '$stores/CollectionFilesStore';
import { getFilesAsync } from '$lib/utilities/fileDropHandling';
import { get } from 'svelte/store';
import getFilesFromData from '$lib/utilities/getFilesFromData';
import { imagesFileTypesAllowed } from '$lib/config/config';

export const collectionImagesValidation = async (data) => {
  const validationResult = await validateImages(data, imagesFileTypesAllowed);

  if (validationResult.validation === true) {
    const getFiles = validationResult.files.filter((file) => file.name !== '.DS_Store');

    // If the validation successful and the CSV is already uploaded: we run the cross check validation
    if (get(csvStore).files.length > 0) {
      const crossedValidationResult = crossCheckValidation(get(csvStore).parsedFiles, get(csvStore).metadata, getFiles);
      if (crossedValidationResult === true) {
        // If the cross check validation successful: we save the file in the store
        return {
          validation: true,
          files: getFiles,
        };
      } else {
        // If the cross check validation failed: we set the error message
        return {
          validation: false,
          errors: crossedValidationResult.error,
        };
      }
    } else {
      // If the CSV is not uploaded yet: we save our files and update validation state
      return {
        validation: true,
        files: getFiles,
      };
    }
  } else {
    // If the validation failed: we set the error message and set state to 'invalid'
    return {
      validation: false,
      errors: validationResult.errors,
    };
  }
};

// This validations are called at the moment of file drop
//
// If validation is succesful => return true
// If validation is not succesful => return an object with the error
export async function validateImages(data, acceptedFileTypes) {
  // const acceptedFileTypes = [
  //   'video/mp4',
  //   'video/webm',
  //   'image/png',
  //   'image/jpg',
  //   'image/jpeg',
  //   'image/webp',
  //   'image/gif',
  // ];
  const maxFileSize = 100000000; // 100 MB

  // File handling
  // TODO: Move file handling to indpenendent functions
  const files = getFilesFromData(data);
  const getFiles = files.source === 'input' ? [...files.list] : await getFilesAsync(files.list);

  // Validations arrays
  const acceptedFilesValidation = [];
  const maxFileSizeValidation = [];

  // Validate functions and push results to validations arrays
  getFiles.forEach((element) => acceptedFilesValidation.push(acceptedFileTypes.some((v) => element.type.includes(v))));
  getFiles.forEach((element) => maxFileSizeValidation.push(element.size < maxFileSize));

  if (acceptedFilesValidation.includes(false)) {
    return {
      validation: false,
      errors: 'Wrong file type',
    };
  } else if (maxFileSizeValidation.includes(false)) {
    return {
      validation: false,
      errors: 'File size is higher than allowed',
    };
  } else {
    return {
      validation: true,
      files: getFiles,
    };
  }
}
