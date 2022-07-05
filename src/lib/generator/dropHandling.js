import { validateCsvBeforeParse, validateCsvAfterParse, validateImages } from '$lib/validation/fileDropValidation';
import { csvParsedFile, csvFile, csvState } from '$lib/stores/generator/CsvStore.ts';
import { imagesFiles, imagesState } from '$lib/stores/generator/ImagesStore';
import { setValidationError, setValidationSuccess, saveFileInStore } from '$lib/stores/generator/updateFunctions';
import { getFilesAsync } from '$lib/utilities/handleFileDrop';
import Papa from 'papaparse';
import { crossCheckValidation } from '$lib/validation/crossCheckValidation';
import { get } from 'svelte/store';

export const csvDropHandling = async (data) => {
  const files = getFilesFromData(data);

  // Run a first validation to see if the file is a CSV file
  const beforeParseValidationResult = validateCsvBeforeParse(files);

  if (beforeParseValidationResult === true) {
    // If the file is a CSV file: we parse the file and run a second validation
    const file = files.source === 'input' ? files.list[0] : files.list[0].getAsFile();
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
          if (crossedValidationResult === true) {
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

export const imagesDropHandling = async (data) => {
  const files = getFilesFromData(data);
  const validationResult = validateImages(files);

  if (validationResult === true) {
    const getFiles = files.source === 'input' ? [...files.list] : await getFilesAsync(files.list);

    // If the validation successful and the CSV is already uploaded: we run the cross check validation
    if (get(csvState).uploadState === 'success') {
      const crossedValidationResult = crossCheckValidation(get(csvParsedFile), getFiles);
      if (crossedValidationResult === true) {
        // If the cross check validation successful: we save the file in the store
        saveFileInStore(imagesFiles, getFiles);
        setValidationSuccess(imagesState);
      } else {
        // If the cross check validation failed: we set the error message
        setValidationError(imagesState, crossedValidationResult.error); // TODO: crossedValidationResult is an array of errors
      }
    } else {
      // If the CSV is not uploaded yet: we save our files and update validation state
      saveFileInStore(imagesFiles, getFiles);
      setValidationSuccess(imagesState);
    }
  } else {
    // If the validation failed: we set the error message and set state to 'invalid'
    setValidationError(imagesState, validationResult.error);
  }
};

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
