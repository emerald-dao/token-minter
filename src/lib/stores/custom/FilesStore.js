import { writable } from 'svelte/store';

function createFilesStore(validationFunction) {
  const { subscribe, update, set } = writable({
    files: [],
    metadata: [],
    parsedFiles: [],
    errors: [],
  });

  async function saveFiles(files) {
    const validationResult = await validationFunction(files);
    if (validationResult.validation === true) {
      update((store) => {
        store.files = [...store.files, ...validationResult.files];
        if (validationResult.metadata) store.metadata = [...store.metadata, ...validationResult.metadata];
        if (validationResult.parsedFiles) store.parsedFiles = [...store.parsedFiles, ...validationResult.parsedFiles];
        store.errors = [];
        return store;
      });
    } else {
      update((store) => {
        store.errors = [validationResult.errors];
        return store;
      });
    }
  }

  function deleteAllFiles() {
    set({
      files: [],
      metadata: [],
      parsedFiles: [],
      errors: [],
    });
  }

  function deleteFile(index) {
    update((store) => {
      store.files.splice(index, 1);
      return store;
    });
  }

  return {
    subscribe,
    saveFiles,
    deleteAllFiles,
    deleteFile,
  };
}

export default createFilesStore;
