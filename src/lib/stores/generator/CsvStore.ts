import type { Writable } from 'svelte/types/runtime/store';
import type { FileState } from './interfaces';
import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { persistentWritable } from '../ThemeStore.js'

export const csvState: Writable<FileState> = writable({
  uploadState: 'idle',
  errorMessages: [],
});

export const csvParsedFile = writable(null);
export const csvMetadata = persistentWritable('csvMetadata', {});
export const csvFile = writable(null);

export const emptyCsvStore = () => {
  csvState.set({
    uploadState: 'idle',
    errorMessages: [],
  });
  csvParsedFile.set(null);
  csvMetadata.set(null);
  csvFile.set(null);
};