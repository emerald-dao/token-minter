import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const theme = persistentWritable('theme', 'dark');

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// Make any writable store persistent.
export function persistentWritable(key, defaultValue) {
  // Create a writable store.
  const { subscribe, set, update } = writable();

  let storedValue;
  // Get stored value.
  if (browser) {
    storedValue = localStorage.getItem(key);
  }

  // Determine resolved value.
  const resolvedValue = storedValue === null ? defaultValue : storedValue;
  if (resolvedValue && isJsonString(resolvedValue)) {
    set(JSON.parse(resolvedValue));
  } else {
    set(resolvedValue)
  }

  // Subscribe to changes.
  subscribe((value) => {
    // Store the new value.
    if (browser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return { subscribe, set, update };
}
