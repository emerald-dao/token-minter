import {
  CollectionInfo,
  UploadAssets,
  ContractInfo,
  Deploy,
  UploadMetadata,
  ThankYou,
} from '$components/sections/generator/index.js';

const generatorSteps = [
  {
    title: 'Collection Information',
    component: CollectionInfo,
    emoji: 'ℹ️',
  },
  {
    title: 'Upload Assets',
    component: UploadAssets,
    emoji: '🗂',
    allowToGoBack: 1,
  },
  {
    title: 'Contract Information',
    component: ContractInfo,
    emoji: '📜',
  },
  {
    title: 'Deploy',
    component: Deploy,
    emoji: '🚀',
    allowToGoBack: 1,
  },
  {
    title: 'Upload Metadata',
    component: UploadMetadata,
    emoji: '👆',
  },
  {
    title: 'Thank You',
    component: ThankYou,
    emoji: '🎉',
  },
];

export default generatorSteps;
