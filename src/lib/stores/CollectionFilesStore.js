import createFilesStore from '$stores/custom/FilesStore';
import { csvValidation } from '$lib/validation/csvValidation';
import { collectionImagesValidation } from '$lib/validation/imagesValidation';

export const csvStore = createFilesStore(csvValidation);
export const imagesStore = createFilesStore(collectionImagesValidation);
