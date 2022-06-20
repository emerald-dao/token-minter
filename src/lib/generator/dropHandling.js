import { validateCsvBeforeParse, validateCsvAfterParse, validateImages } from '$lib/validation/fileDropValidation';
import { csvFiles, csvState } from '$lib/generator/stores/CsvStore';
import { imagesFiles, imagesState } from '$lib/generator/stores/ImagesStore';
import { setValidationError, setValidationSuccess, saveFileInStore } from '$lib/generator/stores/updateFunctions';
import { getFilesAsync } from '$lib/utilities/handleFileDrop';
import Papa from 'papaparse';

export const csvDropHandling = (dataTransfer) => {
  // Run a first validation to see if the file is a CSV file
  let beforeParseValidationResult = validateCsvBeforeParse(dataTransfer);

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
      let afterParseValidationResult = validateCsvAfterParse(parsedCSV);

      if (afterParseValidationResult === true) {
        // If the validation successful: we add the file to the store + set state to 'uploaded'
        saveFileInStore(csvFiles, parsedCSV);
        setValidationSuccess(csvState);
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
  let validationResult = validateImages(dataTransfer);

  if (validationResult === true) {
    const files = await getFilesAsync(dataTransfer);
    // If the validation successful: we add the file to the store + set state to 'uploaded'
    saveFileInStore(imagesFiles, files);
    setValidationSuccess(imagesState);
  } else {
    // If the validation failed: we set the error message and set state to 'invalid'
    setValidationError(imagesState, validationResult.error);
  }
};
