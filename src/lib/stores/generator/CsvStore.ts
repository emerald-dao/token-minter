import type { Writable } from 'svelte/types/runtime/store';
import type { FileState } from './interfaces';
import { writable } from 'svelte/store';

export const csvState: Writable<FileState> = writable({
  uploadState: 'idle',
  errorMessages: [],
});

export const csvParsedFile = writable(null);
export const csvFile = writable(null);
export const attributes = writable([]);

export const emptyCsvStore = () => {
  csvState.set({
    uploadState: 'idle',
    errorMessages: [],
  });
  csvParsedFile.set(null);
  csvFile.set(null);
};
