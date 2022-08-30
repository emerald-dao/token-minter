import createFilesStore from '$stores/custom/FilesStore';
import { derived } from 'svelte/store';
import { replaceWithProperValues } from '$flow/actions';
import contract from '$flow/cadence/ExampleNFT.cdc?raw';
import { user, addresses } from '$stores/FlowStore';
import createObjectStore from '$stores/custom/ObjectStore';
import { validateImages } from '$lib/validation/imagesValidation';

export const collectionInfo = createObjectStore('collectionInfo', {
  name: '',
  contractName: '',
  description: '',
  payment: null,
});
export const collectionImage = createFilesStore(validateImages);
export const collectionImageName = derived([collectionImage], ([$collectionImage]) => {
  if ($collectionImage.files[0]) return $collectionImage.files[0].name;
});
export const collectionBannerImage = createFilesStore(validateImages);
export const collectionBannerImageName = derived([collectionBannerImage], ([$collectionBannerImage]) => {
  if ($collectionBannerImage.files[0]) return $collectionBannerImage.files[0].name;
});
export const collectionSocials = createObjectStore('collectionSocials', {
  website: '',
  discord: '',
  twitter: '',
});
export const contractOptions = createObjectStore('contractOptions', {
  startMinting: true,
  royalty: false,
  royaltyText: '',
  royaltyNumber: '',
});
export const verifierOptions = createObjectStore('verifierOptions', {
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
    contractOptions,
    verifierOptions,
  ],
  ([
    $collectionInfo,
    $collectionImage,
    $collectionImageName,
    $collectionBannerImage,
    $collectionBannerImageName,
    $collectionSocials,
    $contractOptions,
    $verifierOptions,
  ]) => {
    return {
      name: $collectionInfo.name,
      contractName: $collectionInfo.contractName,
      description: $collectionInfo.description,
      payment: $collectionInfo.payment,
      image: $collectionImage.files[0],
      imageName: $collectionImageName,
      bannerImage: $collectionBannerImage.files[0],
      bannerImageName: $collectionBannerImageName,
      // Socials
      website: $collectionSocials.website,
      discord: $collectionSocials.discord,
      twitter: $collectionSocials.twitter,
      // Contract Options
      startMinting: $contractOptions.startMinting,
      royalty: $contractOptions.royalty,
      royaltyText: $contractOptions.royaltyText,
      royaltyNumber: $contractOptions.royaltyNumber,
      // Verifier Options
      floatLink: $verifierOptions.floatLink,
      floatLinkText: $verifierOptions.floatLinkText,
      requireEmeraldPass: $verifierOptions.requireEmeraldPass,
    };
  }
);

export const contractCode = derived([contractInfo, user, addresses], ([$contractInfo, $user]) => {
  return replaceWithProperValues(contract, $contractInfo.contractName, undefined).replaceAll('USER_ADDR', $user.addr);
});

export const restartContractInfo = () => {
  collectionInfo.reset();
  collectionImage.deleteAllFiles();
  collectionBannerImage.deleteAllFiles();
  collectionSocials.reset();
  contractOptions.reset();
  verifierOptions.reset();
};
