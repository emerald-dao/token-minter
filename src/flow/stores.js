import { persistentWritable } from '$lib/stores/ThemeStore';
import { writable, get, derived } from 'svelte/store';
import { replaceWithProperValues } from './actions';
import contract from './cadence/ExampleNFT.cdc?raw';

const contractData = {
  NonFungibleToken: {
    testnet: '0x631e88ae7f1d7c20',
    mainnet: '0x1d7e57aa55817448',
  },
  MetadataViews: {
    testnet: '0x631e88ae7f1d7c20',
    mainnet: '0x1d7e57aa55817448',
  },
  FungibleToken: {
    testnet: '0x9a0766d93b6608b7',
    mainnet: '0xf233dcee88fe0abe',
  },
  FlowToken: {
    testnet: '0x7e60df042a9c0868',
    mainnet: '0x1654653399040a61',
  },
  ECTreasury: {
    testnet: '0x6c0d53c676256e8c',
    mainnet: '0x5643fd47a29770e7',
  },
  MintVerifiers: {
    testnet: '0x73a19dd056affc4d',
    mainnet: '',
  },
  TouchstoneContracts: {
    testnet: '0xd24f69d0e1865520',
    mainnet: '',
  },
  FLOAT: {
    testnet: '0x0afe396ebc8eee65',
    mainnet: '0x2d4c3caffbeab845',
  },
  FIND: {
    testnet: '0xa16ab1d0abde3625',
    mainnet: '0x097bafa4e0b48eef',
  },
  FN: {
    testnet: '0xb05b2abb42335e88',
    mainnet: '0x233eb012d34b0070',
  },
  EmeraldPass: {
    testnet: '0x5a2114f5b8c53b0d',
    mainnet: '',
  },
  NFTCatalog: {
    testnet: "0x324c34e1c517e4db",
    mainnet: "0x49a7cda3a1eecc29"
  }
};

export const user = writable(null);
export const network = writable('testnet');
export const profile = writable(null);
export const transactionStatus = writable(null);
export const transactionInProgress = writable(false);
export const addresses = derived([network], ([$network]) => {
  return {
    NonFungibleToken: contractData.NonFungibleToken[$network],
    MetadataViews: contractData.MetadataViews[$network],
    FungibleToken: contractData.FungibleToken[$network],
    FlowToken: contractData.FlowToken[$network],
    ECTreasury: contractData.ECTreasury[$network],
    MintVerifiers: contractData.MintVerifiers[$network],
    FLOAT: contractData.FLOAT[$network],
    FIND: contractData.FIND[$network],
    FN: contractData.FN[$network],
    TouchstoneContracts: contractData.TouchstoneContracts[$network],
    EmeraldPass: contractData.EmeraldPass[$network],
    NFTCatalog: contractData.NFTCatalog[$network]
  };
});

export const contractInfo = persistentWritable('contractInfo', {
  name: '',
  contractName: '',
  description: '',
  image: null,
  imageName: '',
  bannerImage: null,
  bannerImageName: '',
  website: '',
  discord: '',
  twitter: '',
  payment: null,
  // Contract Options
  startMinting: true,
  royalty: false,
  royaltyText: '',
  royaltyNumber: '',
  // Verifier Options
  floatLink: false,
  floatLinkText: '',
  requireEmeraldPass: false
});

export const contractCode = derived([contractInfo, user, addresses], ([$contractInfo, $user]) => {
  return replaceWithProperValues(contract, $contractInfo.contractName, undefined).replaceAll(
    'USER_ADDR',
    $user.addr
  );
});

export const restartContractInfo = () => {
  contractInfo.set({
    name: '',
    contractName: '',
    description: '',
    image: null,
    imageName: '',
    bannerImage: null,
    bannerImageName: '',
    website: '',
    discord: '',
    twitter: '',
    payment: null,
    startMinting: true,
    royalty: false,
    royaltyText: '',
    royaltyNumber: 0,
    floatLink: false,
    floatLinkText: '',
    requireEmeraldPass: false
  });
};
