import persistentWritable from '$lib/utilities/persistentWritable';

function createObjectStore(key, initialValues) {
  const { subscribe, set } = persistentWritable(key, initialValues);

  function reset() {
    console.log(initialValues);
    set(initialValues);
  }

  return {
    subscribe,
    set,
    reset,
  };
}

export default createObjectStore;
