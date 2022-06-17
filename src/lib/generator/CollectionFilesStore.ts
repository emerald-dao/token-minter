import type { Writable } from 'svelte/types/runtime/store';
import { writable } from 'svelte/store';

interface FileState {
  uploadState: 'idle' | 'uploading' | 'uploaded' | 'validating' | 'invalid' | 'success';
  errorMessages: ErrorMessages[];
}

interface ErrorMessages {
  message: string;
  image_files?: [];
  nft_ids?: [];
}

export const imagesState: Writable<FileState> = writable({
  uploadState: 'idle',
  errorMessages: [],
});
export const imagesFiles = writable([]);

export const csvState: Writable<FileState> = writable({
  uploadState: 'idle',
  errorMessages: [],
});
export const csvFiles = writable([]);

// export const imagesFiles = writable([]);
// export const csvFile = writable(null);
export const userIPFSToken = writable('');
