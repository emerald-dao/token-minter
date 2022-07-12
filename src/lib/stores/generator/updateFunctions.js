import { get } from 'svelte/store';
import { activeStep, stepsArray } from './generatorGeneralStore';

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

export const onNext = () => {
  changeStepState(get(activeStep), 'success');
  activeStep.update((current) => current + 1);
  console.log(get(stepsArray));
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
