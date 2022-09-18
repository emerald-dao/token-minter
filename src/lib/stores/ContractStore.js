import createFilesStore from '$stores/custom/FilesStore';
import { derived } from 'svelte/store';
import { replaceWithProperValues } from '$flow/actions';
import contract from '$flow/cadence/ExampleNFT.cdc?raw';
import { user, addresses } from '$stores/FlowStore';
import createObjectStore from '$stores/custom/ObjectStore';
import { validateImages } from '$lib/validation/imagesValidation';
import { imagesFileTypesAllowed } from '$lib/config/config';

export const collectionInfo = createObjectStore('collectionInfo', {
  name: '',
  contractName: '',
  description: '',
  payment: null,
  paymentType: '$FLOW'
});
export const collectionImage = createFilesStore(validateImages, imagesFileTypesAllowed);
export const collectionImageName = derived([collectionImage], ([$collectionImage]) => {
  if ($collectionImage.files[0]) return $collectionImage.files[0].name;
});
export const collectionBannerImage = createFilesStore(validateImages, [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/gif',
]);
export const collectionBannerImageName = derived([collectionBannerImage], ([$collectionBannerImage]) => {
  if ($collectionBannerImage.files[0]) return $collectionBannerImage.files[0].name;
});
export const collectionSocials = createObjectStore('collectionSocials', {
  website: '',
  discord: '',
  twitter: '',
});
export const contractOptionsStore = createObjectStore('contractOptionsStore', {
  startMinting: true,
  royalty: false,
  royaltyText: '',
  royaltyNumber: '',
  lotteryBuying: false
});
export const verifiersOptionsStore = createObjectStore('verifiersOptionsStore', {
  floatLink: false,
  floatLinkText: '',
  requireEmeraldPass: false,
});

export const contractInfo = derived(
  [
    collectionInfo,
    collectionImage,
    collectionImageName,
    collectionBannerImage,
    collectionBannerImageName,
    collectionSocials,
    contractOptionsStore,
    verifiersOptionsStore,
  ],
  ([
    $collectionInfo,
    $collectionImage,
    $collectionImageName,
    $collectionBannerImage,
    $collectionBannerImageName,
    $collectionSocials,
    $contractOptionsStore,
    $verifiersOptionsStore,
  ]) => {
    return {
      name: $collectionInfo.name,
      contractName: $collectionInfo.contractName,
      description: $collectionInfo.description,
      payment: $collectionInfo.payment,
      paymentType: $collectionInfo.paymentType,
      image: $collectionImage.files[0],
      imageName: $collectionImageName,
      bannerImage: $collectionBannerImage.files[0],
      bannerImageName: $collectionBannerImageName,
      // Socials
      website: $collectionSocials.website,
      discord: $collectionSocials.discord,
      twitter: $collectionSocials.twitter,
      // Contract Options
      startMinting: $contractOptionsStore.startMinting,
      royalty: $contractOptionsStore.royalty,
      royaltyText: $contractOptionsStore.royaltyText,
      royaltyNumber: $contractOptionsStore.royaltyNumber,
      lotteryBuying: $contractOptionsStore.lotteryBuying,
      // Verifier Options
      floatLink: $verifiersOptionsStore.floatLink,
      floatLinkText: $verifiersOptionsStore.floatLinkText,
      requireEmeraldPass: $verifiersOptionsStore.requireEmeraldPass,
    };
  }
);

export const contractCode = derived([contractInfo, user, addresses], ([$contractInfo, $user]) => {
  let vaultType = '';
  let receiverPath = '';
  if ($contractInfo.paymentType == "$FLOW") {
    vaultType = "FlowToken.Vault";
    receiverPath = "flowTokenReceiver";
  } else if ($contractInfo.paymentType == "$FUSD") {
    vaultType = "FUSD.Vault";
    receiverPath = "fusdReceiver";
  }
  return replaceWithProperValues(contract, $contractInfo.contractName, undefined)
    .replaceAll('USER_ADDR', $user.addr)
    .replaceAll('FungibleToken.Vault', vaultType)
    .replaceAll('RECEIVER_PATH', receiverPath);
});

export const restartContractInfo = () => {
  collectionInfo.reset();
  collectionImage.deleteAllFiles();
  collectionBannerImage.deleteAllFiles();
  collectionSocials.reset();
  contractOptionsStore.reset();
  verifiersOptionsStore.reset();
};
