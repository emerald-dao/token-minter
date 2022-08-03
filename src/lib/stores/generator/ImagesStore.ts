import type { Writable } from 'svelte/types/runtime/store';
import type { FileState } from './interfaces';
import { writable } from 'svelte/store';

export const imagesState: Writable<FileState> = writable({
  uploadState: 'idle',
  errorMessages: [],
});

export const imagesFiles = writable([]);

export const setImagesStateToIdle = () => {
  imagesState.update((s) => ({
    uploadState: 'idle',
    errorMessages: [],
  }));
};

export const emptyImagesStore = () => {
  setImagesStateToIdle();
  imagesFiles.set(null);
};
