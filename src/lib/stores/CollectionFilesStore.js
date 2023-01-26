import createFilesStore from '$stores/custom/FilesStore';
import { csvValidation, airdropCSVValidation } from '$lib/validation/csvValidation';
import { collectionImagesValidation } from '$lib/validation/imagesValidation';
import { writable } from 'svelte/store';

export const uploadType = writable('');
export const csvStore = createFilesStore(csvValidation);
export const imagesStore = createFilesStore(collectionImagesValidation);
export const airdropCSVStore = createFilesStore(airdropCSVValidation);
