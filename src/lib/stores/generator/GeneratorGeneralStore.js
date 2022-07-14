import { writable, get } from 'svelte/store';
import { browser } from '$app/env';
import { onNext, onBack } from './updateFunctions';
import {
  CollectionInfo,
  UploadAssets,
  CollectionPreview,
  ContractInfo,
  Deploy,
  UploadMetadata,
} from '$lib/components/sections/generator/index.js';
import { uploadToIPFS } from '$lib/utilities/uploadToIPFS';
import { userIPFSToken } from '$lib/stores/generator/IPFSstore';
import { csvMetadata } from '$lib/stores/generator/CsvStore.ts';
import { imagesFiles } from '$lib/stores/generator/ImagesStore';

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
    onSubmitText: 'Next',
    state: 'inactive',
  },
  {
    title: 'Upload Assets',
    component: UploadAssets,
    emoji: '🗂',
    instructions:
      "In the first box, upload a .csv file with your collection metadata. Metadata must include a 'name', 'description', and 'image' (file name) for each NFT. In the second box, upload a folder with your collection images.",
    onSubmitAction: uploadAssetsToIpfs,
    onSubmitText: 'Upload to IPFS',
    state: 'inactive',
  },
  {
    title: 'Collection Preview',
    component: CollectionPreview,
    emoji: '🖼',
    instructions: "Looks like everything is in order. Let's see what you've got.",
    onSubmitText: 'Next',
    state: 'inactive',
  },
  {
    title: 'Contract Information',
    component: ContractInfo,
    emoji: '📜',
    instructions: 'Define some general information around your contract.',
    onSubmitText: 'Next',
    state: 'inactive',
  },
  {
    title: 'Deploy',
    component: Deploy,
    emoji: '🚀',
    instructions: 'Deploy your contract to the blockchain.',
    onSubmitText: 'Deploy',
    state: 'inactive',
  },
  {
    title: 'Upload Metadata',
    component: UploadMetadata,
    emoji: '👆',
    instructions: 'Upload your metadata to your contract.',
    onSubmitText: 'Deploy',
    state: 'inactive',
  },
]);

async function uploadAssetsToIpfs() {
  console.log('Uploading assets to IPFS');
  // await uploadToIPFS(get(csvMetadata), get(imagesFiles), get(userIPFSToken));
  return false;
}
