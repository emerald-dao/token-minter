import { writable } from 'svelte/store';
import { browser } from '$app/env';
import {
  CollectionInfo,
  UploadAssets,
  ContractInfo,
  Deploy,
  UploadMetadata,
  ThankYou,
} from '$lib/components/sections/generator/index.js';
import { emptyCsvStore } from '$lib/stores/generator/CsvStore.ts';
import { emptyImagesStore } from '$lib/stores/generator/ImagesStore';
import { restartStates } from '$lib/stores/generator/updateFunctions';
import { restartContractInfo } from '../../../flow/stores';

export const activeStep = writable(Number(browser && localStorage.getItem('step')) || 0);

activeStep.subscribe((val) => {
  if (browser) return (localStorage.step = val);
});

export const stepsArray = writable([
  {
    title: 'Collection Information',
    component: CollectionInfo,
    emoji: 'ℹ️',
    // instructions: 'Define some general information around your collection.',
    state: 'inactive',
  },
  {
    title: 'Upload Assets',
    component: UploadAssets,
    emoji: '🗂',
    // instructions:
    //   "In the first box, upload a .csv file with your collection metadata. Metadata must include a 'name', 'description', and 'image' (file name) for each NFT. In the second box, upload a folder with your collection images.",
    state: 'inactive',
    allowToGoBack: 1,
  },
  {
    title: 'Contract Information',
    component: ContractInfo,
    emoji: '📜',
    // instructions: 'Define some general information around your contract.',
    state: 'inactive',
  },
  {
    title: 'Deploy',
    component: Deploy,
    emoji: '🚀',
    // instructions: 'Deploy your contract to the blockchain.',
    state: 'inactive',
    allowToGoBack: 1,
  },
  {
    title: 'Upload Metadata',
    component: UploadMetadata,
    emoji: '👆',
    // instructions: 'Upload your metadata to your contract.',
    state: 'inactive',
  },
  {
    title: 'Thank You',
    component: ThankYou,
    emoji: '🎉',
    state: 'inactive',
  },
]);

export async function newCollection() {
  restartStates();
  emptyCsvStore();
  emptyImagesStore();
  restartContractInfo();
}
