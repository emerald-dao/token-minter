import { writable } from 'svelte/store';
import { network } from '$flow/config';

const contractData = {
  NonFungibleToken: {
    emulator: '0xf8d6e0586b0a20c7',
    testnet: '0x631e88ae7f1d7c20',
    mainnet: '0x1d7e57aa55817448',
  },
  MetadataViews: {
    emulator: '0xf8d6e0586b0a20c7',
    testnet: '0x631e88ae7f1d7c20',
    mainnet: '0x1d7e57aa55817448',
  },
  FungibleToken: {
    emulator: '0xee82856bf20e2aa6',
    testnet: '0x9a0766d93b6608b7',
    mainnet: '0xf233dcee88fe0abe',
  },
  FlowToken: {
    emulator: '0x0ae53cb6e3f42a79',
    testnet: '0x7e60df042a9c0868',
    mainnet: '0x1654653399040a61',
  },
  FUSD: {
    emulator: '0xf8d6e0586b0a20c7',
    testnet: '0xe223d8a629e49c68',
    mainnet: '0x3c5959b568896393',
  },
  ECTreasury: {
    emulator: '0xf8d6e0586b0a20c7',
    testnet: '0x6c0d53c676256e8c',
    mainnet: '0x5643fd47a29770e7',
  },
  MintVerifiers: {
    emulator: '0xf8d6e0586b0a20c7',
    testnet: '0x692e8e2f2f8db5b6',
    mainnet: '0x7a696d6136e1dce2',
  },
  FLOAT: {
    emulator: '0xf8d6e0586b0a20c7',
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
    emulator: '0xf8d6e0586b0a20c7',
    testnet: '0x692e8e2f2f8db5b6',
    mainnet: '0x6a07dbeb03167a13',
  },
  EmeraldID: {
    testnet: '0x692e8e2f2f8db5b6',
    mainnet: '0x39e42c67cc851cfb',
  },
  NFTCatalog: {
    testnet: '0x324c34e1c517e4db',
    mainnet: '0x49a7cda3a1eecc29',
  }
};

export const user = writable(null);
export const profile = writable(null);
export const transactionStatus = writable({});
export const transactionInProgress = writable(false);
export const addresses =  {
  NonFungibleToken: contractData.NonFungibleToken[network],
  MetadataViews: contractData.MetadataViews[network],
  FungibleToken: contractData.FungibleToken[network],
  FlowToken: contractData.FlowToken[network],
  FUSD: contractData.FUSD[network],
  ECTreasury: contractData.ECTreasury[network],
  MintVerifiers: contractData.MintVerifiers[network],
  FLOAT: contractData.FLOAT[network],
  FIND: contractData.FIND[network],
  FN: contractData.FN[network],
  EmeraldPass: contractData.EmeraldPass[network],
  EmeraldID: contractData.EmeraldID[network],
  NFTCatalog: contractData.NFTCatalog[network]
};
