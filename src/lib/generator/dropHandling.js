import { validateCsvBeforeParse, validateCsvAfterParse, validateImages } from '$lib/validation/fileDropValidation';
import { csvFiles, imagesFiles, csvState, imagesState } from '$lib/generator/CollectionFilesStore';
import { getFilesAsync } from '$lib/utilities/handleFileDrop';

export const csvDropHandling = (dataTransfer) => {
  // Run a first, fast validation, to see if the file is a CSV file
  let beforeParseValidationResult = validateCsvBeforeParse(dataTransfer);

  if (beforeParseValidationResult === true) {
    // If the file is a CSV file, we parse the file and run a second validation
    console.log('parse csv');
    // If the validation is successful, we add the file to the store + set state to 'uploaded'
    validateCsvAfterParse;
    // If validation is invalid => set state to 'invalid' and add error messages
  } else {
    // If validation is invalid => set state to 'invalid' and add error messages
    csvState.update((s) => ({
      uploadState: 'invalid',
      errorMessages: [...s.errorMessages, beforeParseValidationResult.error],
    }));
  }
};

export const imagesDropHandling = async (dataTransfer) => {
  let validationResult = validateImages(dataTransfer);

  // If validation is valid => get files and add them to the store + set state to 'uploaded'
  if (validationResult === true) {
    const files = await getFilesAsync(dataTransfer);
    imagesFiles.set(files);
    imagesState.set({
      uploadState: 'uploaded',
      errorMessages: [],
    });
  } else {
    // If validation is invalid => set state to 'invalid' and add error messages
    imagesState.update((s) => ({
      uploadState: 'invalid',
      errorMessages: [...s.errorMessages, validationResult.error],
    }));
  }
};
