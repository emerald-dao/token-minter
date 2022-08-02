import { get } from 'svelte/store';
import { activeStep, stepsArray } from './GeneratorGeneralStore';

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

export const onNext = (stepFunction) => {
  console.log('next');
  if (stepFunction) {
    changeStepState(get(activeStep), 'loading');
    let promise = new Promise(async (resolve, reject) => {
      let stepJob = await stepFunction();
      console.log('stepJob', stepFunction);
      if (stepJob === true) {
        resolve('success');
      } else {
        reject(stepJob.error);
      }
    });
    promise
      .then(() => {
        changeStepState(get(activeStep), 'success');
        activeStep.update((current) => current + 1);
      })
      .catch((message) => {
        changeStepState(get(activeStep), 'error');
        alert(message);
      });
  } else {
    changeStepState(get(activeStep), 'success');
    activeStep.update((current) => current + 1);
  }
};

export const onBack = () => {
  activeStep.update((current) => current - 1);
};

export const changeStepState = (stepNumber, state) => {
  stepsArray.update((steps) => {
    steps[stepNumber].state = state;
    return steps;
  });
};
