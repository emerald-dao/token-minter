import { writable } from 'svelte/store';
import persistentWritable from '$lib/utilities/persistentWritable';
import { browser } from '$app/env';
import { timeToUpdateFlowPrice } from '$lib/config/config';

export default function () {
  const loading = writable(false);
  const error = writable(false);
  const flowPrice = persistentWritable('flowPrice', {
    price: '',
    timestamp: '',
  });

  // Function to call the CoinMarketCap API by 15 minutes (to prevent many innecesary API calls)
  async function get() {
    if (browser) {
      let storedValue = localStorage.getItem('flowPrice');
      let parsedValue = await JSON.parse(storedValue);

      error.set(false);

      console.log(
        'Flow price - Last time fetched',
        `${(new Date().getTime() - new Date(parsedValue.timestamp).getTime()) / 1000 / 60} minutes ago`
      );

      if (
        storedValue &&
        (new Date().getTime() - new Date(parsedValue.timestamp).getTime()) / 1000 / 60 > timeToUpdateFlowPrice
      ) {
        // If the last saved timestamp is 15 minutes before now, we call the API and refresh the data
        console.log('Updating Flow Price');
        loading.set(true);
        await saveFlowPrice(error, loading, flowPrice);
      } else if (parsedValue.timestamp === '') {
        // If we have no data stored on local storage, we also call the API
        console.log('Fetching Flow Price');
        loading.set(true);
        await saveFlowPrice(error, loading, flowPrice);
      } else {
        // In any other situation, we don't need to call the API, so we just set error and loading to false
        console.log('We Have Flow Price');
        error.set(false);
        loading.set(false);
      }
    }
  }

  get();

  return [flowPrice, loading, error, get];
}

const fetchApi = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const saveFlowPrice = async (errorStore, loadingStore, dataStore) => {
  let fetchPrice = await fetchApi('/api/flow-price.json');
  if (fetchPrice) {
    let price = fetchPrice.flowPrice;
    dataStore.set({
      price: price,
      timestamp: new Date(),
    });
    loadingStore.set(false);
  } else {
    errorStore.set(true);
    loadingStore.set(false);
  }
};
