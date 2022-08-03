import { writable, get } from 'svelte/store';
import { browser } from '$app/env';
import {
  CollectionInfo,
  UploadAssets,
  CollectionPreview,
  ContractInfo,
  Deploy,
  UploadMetadata,
  ThankYou,
} from '$lib/components/sections/generator/index.js';
import { uploadToIPFS } from '$lib/utilities/uploadToIPFS';
import { userIPFSToken } from '$lib/stores/generator/IPFSstore';
import { csvMetadata, emptyCsvStore } from '$lib/stores/generator/CsvStore.ts';
import { imagesFiles, emptyImagesStore } from '$lib/stores/generator/ImagesStore';
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
    instructions: 'Define some general information around your collection.',
    button: {
      active: {
        text: 'Next',
      },
      loading: {
        text: 'Loading',
      },
    },
    state: 'inactive',
  },
  {
    title: 'Upload Assets',
    component: UploadAssets,
    emoji: '🗂',
    instructions:
      "In the first box, upload a .csv file with your collection metadata. Metadata must include a 'name', 'description', and 'image' (file name) for each NFT. In the second box, upload a folder with your collection images.",
    onSubmitAction: uploadAssetsToIpfs,
    button: {
      active: {
        text: 'Upload to IPFS',
        icon: 'arrow-up-circle',
      },
      loading: {
        text: 'Uploading',
      },
    },
    state: 'inactive',
  },
  {
    title: 'Collection Preview',
    component: CollectionPreview,
    emoji: '🖼',
    instructions: "Looks like everything is in order. Let's see what you've got.",
    button: {
      active: {
        text: 'Next',
      },
      loading: {
        text: 'Loading',
      },
    },
    state: 'inactive',
  },
  {
    title: 'Contract Information',
    component: ContractInfo,
    emoji: '📜',
    instructions: 'Define some general information around your contract.',
    button: {
      active: {
        text: 'Next',
      },
      loading: {
        text: 'Loading',
      },
    },
    state: 'inactive',
  },
  {
    title: 'Deploy',
    component: Deploy,
    emoji: '🚀',
    instructions: 'Deploy your contract to the blockchain.',
    state: 'inactive',
  },
  {
    title: 'Upload Metadata',
    component: UploadMetadata,
    emoji: '👆',
    instructions: 'Upload your metadata to your contract.',
    state: 'inactive',
  },
  {
    title: 'Thank You',
    component: ThankYou,
    emoji: '🎉',
    state: 'inactive',
    onSubmitAction: newCollection,
    button: {
      active: {
        text: 'Create New Collection',
        icon: 'add-circle',
      },
    },
  },
]);

async function uploadAssetsToIpfs() {
  return await uploadToIPFS(get(csvMetadata), get(imagesFiles), get(userIPFSToken));
}

async function newCollection() {
  restartStates();
  emptyCsvStore();
  emptyImagesStore();
  restartContractInfo();
}
