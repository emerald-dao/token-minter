import { validateCsvBeforeParse, validateCsvAfterParse, validateImages } from '$lib/validation/fileDropValidation';
import { csvParsedFile, csvFile, csvState } from '$lib/stores/generator/CsvStore';
import { imagesFiles, imagesState } from '$lib/stores/generator/ImagesStore';
import { setValidationError, setValidationSuccess, saveFileInStore } from '$lib/stores/generator/updateFunctions';
import { getFilesAsync } from '$lib/utilities/handleFileDrop';
import Papa from 'papaparse';
import { crossCheckValidation } from '$lib/validation/crossCheckValidation';
import { get } from 'svelte/store';

export const csvDropHandling = async (dataTransfer) => {
  // Run a first validation to see if the file is a CSV file
  const beforeParseValidationResult = validateCsvBeforeParse(dataTransfer);

  if (beforeParseValidationResult === true) {
    // If the file is a CSV file: we parse the file and run a second validation
    const file = dataTransfer.items[0].getAsFile();
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

      if (afterParseValidationResult === true) {
        if (get(imagesState).uploadState === 'success') {
          // If the validation successful and the images are already uploaded: we run the cross check validation
          const crossedValidationResult = crossCheckValidation(parsedCSV, get(imagesFiles));
          if (crossedValidationResult.length === true) {
            // If the cross check validation successful: we save the file in the store
            saveFileInStore(csvFile, file);
            saveFileInStore(csvParsedFile, parsedCSV);
            setValidationSuccess(csvState);
          } else {
            // If the cross check validation failed: we set the error message
            setValidationError(csvState, crossedValidationResult.error); // TODO: crossedValidationResult is an array of errors
          }
        } else {
          // If images are not uploaded yet: we save our files and update validation state
          saveFileInStore(csvFile, file);
          saveFileInStore(csvParsedFile, parsedCSV);
          setValidationSuccess(csvState);
        }
      } else {
        // If the validation failed: we set the error message and set state to 'invalid'
        setValidationError(csvState, afterParseValidationResult.error);
      }
    });
  } else {
    // If the validation failed: we set the error message and set state to 'invalid'
    setValidationError(csvState, beforeParseValidationResult.error);
  }
};

export const imagesDropHandling = async (dataTransfer) => {
  const validationResult = validateImages(dataTransfer);

  if (validationResult === true) {
    const files = await getFilesAsync(dataTransfer);


    // If the validation successful and the CSV is already uploaded: we run the cross check validation
    if (get(csvState).uploadState === 'success') {
      const crossedValidationResult = crossCheckValidation(get(csvParsedFile), files);
      if (crossedValidationResult === true) {
        // If the cross check validation successful: we save the file in the store
        saveFileInStore(imagesFiles, files);
        setValidationSuccess(imagesState);
      } else {
        // If the cross check validation failed: we set the error message
        setValidationError(imagesState, crossedValidationResult.error);
      }
    } else {
      // If the CSV is not uploaded yet: we save our files and update validation state
      saveFileInStore(imagesFiles, files);
      setValidationSuccess(imagesState);
    }
  } else {
    // If the validation failed: we set the error message and set state to 'invalid'
    setValidationError(imagesState, validationResult.error);
  }
};
