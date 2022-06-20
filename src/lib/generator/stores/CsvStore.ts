import type { Writable } from 'svelte/types/runtime/store';
import type { FileState, ErrorMessages } from './interfaces';
import { writable } from 'svelte/store';

export const csvState: Writable<FileState> = writable({
  uploadState: 'idle',
  errorMessages: [],
});

export const csvFiles = writable([]);
