export const saveFileInStore = (store, file) => {
  store.set(file);
};

export const setValidationError = (store, message) => {
  store.update((s) => ({
    uploadState: 'invalid',
    errorMessages: [message],
  }));
};

export const setValidationSuccess = (store) => {
  store.update((s) => ({
    uploadState: 'success',
    errorMessages: [],
  }));
};
