import persistentWritable from '$lib/utilities/persistentWritable';
import { csvStore, imagesStore } from '$stores/CollectionFilesStore';
import { restartContractInfo } from '$stores/ContractStore';

export function createActiveStep(key, initialValue) {
  const { subscribe, set, update } = persistentWritable(key, initialValue);

  function reset() {
    set(initialValue);
  }

  function setLoading(state) {
    update((current) => {
      current.loading = state;
      return current;
    });
  }

  function setErrors(errors) {
    update((current) => {
      current.error = errors;
      return current;
    });
  }

  function onNext(stepFunction) {
    if (stepFunction) {
      setLoading(true);
      let promise = new Promise(async (resolve, reject) => {
        let stepJob = await stepFunction();
        if (stepJob === true) {
          resolve('success');
        } else {
          setLoading(false);
          setErrors([stepJob.error]);
          window.alert(stepJob.error);
          reject(stepJob.error);
        }
      });
      promise
        .then(() => {
          setLoading(false);
          setErrors([]);
          update((current) => {
            current.step++;
            return current;
          });
        })
        .catch((message) => {
          setLoading(false);
          setErrors([stepJob.error]);
          alert(message);
        });
    } else {
      setLoading(false);
      setErrors([]);
      update((current) => {
        current.step++;
        return current;
      });
    }
  }

  function onBack() {
    update((current) => {
      current.step--;
      return current;
    });
  }

  return {
    subscribe,
    set,
    onNext,
    onBack,
    reset,
  };
}

export const activeStep = createActiveStep('activeStep', {
  step: 0,
  loading: false,
  errors: [],
});

export async function newCollection() {
  csvStore.deleteAllFiles();
  imagesStore.deleteAllFiles();
  restartContractInfo();
  activeStep.reset();
  console.log(activeStep);
}
