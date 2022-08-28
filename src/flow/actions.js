import { browser } from '$app/env';
import { get } from 'svelte/store';
import { Buffer } from 'buffer';
import { onNext } from '$lib/stores/generator/updateFunctions';

import * as fcl from '@onflow/fcl';
import './config';

import {
  user,
  transactionStatus,
  transactionInProgress,
  contractInfo,
  contractCode,
  addresses,
  network,
} from './stores';
import { resultCID } from '$lib/stores/generator/IPFSstore.ts';

import { saveFileInStore } from '$lib/stores/generator/updateFunctions';
import { resolveAddressObject } from './utils';

///////////////
// Cadence code
///////////////
// Scripts
import getCollectionInfoScript from './cadence/scripts/get_collection_info.cdc?raw';
import getContractsInBookScript from './cadence/scripts/get_contracts_in_book.cdc?raw';
import getContractDisplaysScript from './cadence/scripts/get_contract_displays.cdc?raw';
import getContractNames from './cadence/scripts/get_contracts.cdc?raw';
import checkRequiredVerifiersScript from './cadence/scripts/check_required_verifiers.cdc?raw';
import getNFTInfoScript from './cadence/scripts/get_nft_info.cdc?raw';
import hasEmeraldPassScript from './cadence/scripts/has_emerald_pass.cdc?raw';
import canMakeReservationScript from './cadence/scripts/can_make_reservation.cdc?raw';
// Transactions
import createMetadatasTx from './cadence/transactions/create_metadatas.cdc?raw';
import deployContractTx from './cadence/transactions/deploy_contract.cdc?raw';
import purchaseNFTTx from './cadence/transactions/purchase_nft.cdc?raw';
import removeContractFromBookTx from './cadence/transactions/remove_contract_from_book.cdc?raw';
import airdropTx from './cadence/transactions/airdrop.cdc?raw';
import toggleMintingTx from './cadence/transactions/toggle_minting.cdc?raw';
import proposeNFTToCatalogTx from './cadence/transactions/propose_nft_to_catalog.cdc?raw';
import setupCollectionTx from './cadence/transactions/setup_collection.cdc?raw';

if (browser) {
  // set Svelte $user store to currentUser,
  // so other components can access it
  fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();

function switchNetwork(newNetwork) {
  if (newNetwork === 'emulator') {
    fcl
      .config()
      .put('accessNode.api', 'http://localhost:8080')
      .put('discovery.wallet', 'http://localhost:8701/fcl/authn');
  } else if (newNetwork === 'testnet') {
    fcl
      .config()
      .put('accessNode.api', 'https://rest-testnet.onflow.org')
      .put('discovery.wallet', "https://fcl-discovery.onflow.org/testnet/authn")
  } else if (newNetwork === 'mainnet') {
    fcl
      .config()
      .put('accessNode.api', 'https://rest-mainnet.onflow.org')
      .put('discovery.wallet', 'https://fcl-discovery.onflow.org/authn');
  }
  saveFileInStore(network, newNetwork);
}

export const deployToTestnet = async () => {
  // unauthenticate();
  switchNetwork('testnet');
  deployContract();
};

export const deployToMainnet = async () => {
  switchNetwork('mainnet');
  deployContract();
};

function initTransactionState() {
  transactionInProgress.set(true);
  transactionStatus.set(-1);
}

export function replaceWithProperValues(script, contractName = '', contractAddress = '') {
  const addressList = get(addresses);
  return script
    .replace('"../ExampleNFT.cdc"', contractAddress)
    .replace('"../utility/NonFungibleToken.cdc"', addressList.NonFungibleToken)
    .replace('"../utility/MetadataViews.cdc"', addressList.MetadataViews)
    .replace('"../utility/FlowToken.cdc"', addressList.FlowToken)
    .replace('"../utility/FungibleToken.cdc"', addressList.FungibleToken)
    .replace('"./utility/NonFungibleToken.cdc"', addressList.NonFungibleToken)
    .replace('"./utility/MetadataViews.cdc"', addressList.MetadataViews)
    .replace('"./utility/FungibleToken.cdc"', addressList.FungibleToken)
    .replace('"./utility/FlowToken.cdc"', addressList.FlowToken)
    .replace('"./MintVerifiers.cdc"', addressList.MintVerifiers)
    .replace('"../MintVerifiers.cdc"', addressList.MintVerifiers)
    .replace('"../TouchstoneContracts.cdc"', addressList.TouchstoneContracts)
    .replace('"../utility/FLOAT.cdc"', addressList.FLOAT)
    .replace('"../utility/EmeraldPass.cdc"', addressList.EmeraldPass)
    .replace('"../utility/NFTCatalog.cdc"', addressList.NFTCatalog)
    .replaceAll('0x5643fd47a29770e7', addressList.ECTreasury)
    .replaceAll('ExampleNFT', contractName);
}

// ****** Transactions ****** //

async function deployContract() {
  const hexCode = Buffer.from(get(contractCode)).toString('hex');
  let info = get(contractInfo);
  console.log(info);

  initTransactionState();

  // Singular FLOAT Verifier
  let eventOwner = null;
  let eventId = null;
  if (info.floatLink) {
    const cutLink = info.floatLinkText.replace('https://floats.city/', ''); // jacob.find/event/376102041
    eventOwner = cutLink.substring(0, cutLink.indexOf('/'));
    eventOwner = (await resolveAddressObject(eventOwner)).address;
    eventId = cutLink.substring(cutLink.indexOf('/event/') + 7);
  }

  let socials = [];
  if (info.discord) socials.push({ key: "discord", value: info.discord });
  if (info.twitter) socials.push({ key: "twitter", value: info.twitter });
  if (info.website) socials.push({ key: "website", value: info.website });

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(deployContractTx),
      args: (arg, t) => [
        arg(info.contractName, t.String),
        arg(info.name, t.String),
        arg(info.description, t.String),
        arg(info.imageName, t.String),
        arg(info.bannerImageName ? info.bannerImageName : null, t.Optional(t.String)),
        arg(Number(info.payment).toFixed(2), t.UFix64),
        arg(get(resultCID), t.String),
        // Socials
        arg(socials, t.Dictionary({ key: t.String, value: t.String })),
        // Contract Options
        arg(info.startMinting, t.Bool),
        arg(info.royalty, t.Bool),
        arg(info.royalty ? info.royaltyText : null, t.Optional(t.Address)),
        arg(info.royalty ? info.royaltyNumber : null, t.Optional(t.UFix64)),
        // Singular FLOAT Verifier
        arg(info.floatLink, t.Bool),
        // Has Emerald Pass Verifier
        arg(info.requireEmeraldPass, t.Bool),
        arg(eventOwner, t.Optional(t.Address)),
        arg(eventId, t.Optional(t.UInt64)),
        // Contract Code
        arg(hexCode, t.String)
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });

    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        // If deployment is successful
        if (res.statusCode === 0) {
          console.log('Successfully deployed the contract.');
          // TODO: Take outside the onNext from this function
          onNext();
        }
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
}

export const purchaseNFT = async (serial, price, contractName, contractAddress) => {
  const transaction = replaceWithProperValues(purchaseNFTTx, contractName, contractAddress);

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args: (arg, t) => [arg(serial, t.UInt64), arg(price, t.UFix64)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
};

// Function to upload metadata to the contract in batches of 500
export async function uploadMetadataToContract(contractName, metadatas, batchSize) {
  const userAddr = get(user).addr;
  // Get The MetadataId we should start at
  let names = [];
  let descriptions = [];
  let thumbnails = [];
  let prices = [];
  let extras = [];
  for (var i = 0; i < metadatas.length; i++) {
    const { name, description, image, price, ...rest } = metadatas[i];
    names.push(name);
    descriptions.push(description);
    thumbnails.push(image);
    prices.push(price);
    let extra = [];
    for (const attribute in rest) {
      if (rest[attribute]) {
        extra.push({ key: attribute, value: rest[attribute] });
      }
    }
    extras.push(extra);
  }

  console.log('Uploading ' + batchSize + ' NFTs to the contract.');
  console.log(extras);

  const transaction = replaceWithProperValues(createMetadatasTx, contractName, userAddr).replaceAll('500', batchSize);

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args: (arg, t) => [
        arg(names, t.Array(t.String)),
        arg(descriptions, t.Array(t.String)),
        arg(thumbnails, t.Array(t.String)),
        arg(prices, t.Array(t.Optional(t.UFix64))),
        arg(extras, t.Array(t.Dictionary({ key: t.String, value: t.String }))),
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });

    const { status, statusCode, errorMessage } = await fcl.tx(transactionId).onceSealed();
    if (status === 4 && statusCode === 0) {
      return { success: true };
    }
    return { success: false, error: errorMessage };
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
    return { success: false, error: e };
  }
}

export const removeContractFromBook = async (contractName) => {

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(removeContractFromBookTx),
      args: (arg, t) => [arg(contractName, t.String)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
};

export const airdrop = async (recipients, metadataIds) => {

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(airdropTx),
      args: (arg, t) => [
        arg(recipients, t.Array(t.Address)),
        arg(metadataIds, t.Array(t.UInt64))
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
};

export const toggleMinting = async () => {

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(toggleMintingTx),
      args: (arg, t) => [],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
};

export const proposeNFTToCatalog = async (contractName, contractAddress) => {

  initTransactionState();

  const { NonFungibleToken, MetadataViews } = get(addresses);
  const publicLinkedTypeRestrictions = [
    `A.${NonFungibleToken.slice(2)}.NonFungibleToken.CollectionPublic`,
    `A.${NonFungibleToken.slice(2)}.NonFungibleToken.Receiver`,
    `A.${MetadataViews.slice(2)}.MetadataViews.ResolverCollection`
  ];
  const privateLinkedTypeRestrictions = publicLinkedTypeRestrictions.concat(`A.${NonFungibleToken.slice(2)}.NonFungibleToken.Provider`);

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(proposeNFTToCatalogTx),
      args: (arg, t) => [
        arg(contractName, t.String),
        arg(contractAddress, t.String),
        arg(publicLinkedTypeRestrictions, t.Array(t.String)),
        arg(privateLinkedTypeRestrictions, t.Array(t.String))
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
};

export const setupCollection = async (contractName, contractAddress) => {

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(setupCollectionTx, contractName, contractAddress),
      args: (arg, t) => [],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
};

// ****** Scripts ****** //

export const getAllContractNames = async (address) => {
  try {
    const response = await fcl.query({
      cadence: getContractNames,
      args: (arg, t) => [
        arg(address, t.Address)
      ],
    });

    return response.map(element => element.name);
  } catch (e) {
    console.log(e);
  }
};

export const getContractDisplays = async (address) => {
  try {
    const response1 = await fcl.query({
      cadence: replaceWithProperValues(getContractsInBookScript),
      args: (arg, t) => [arg(address, t.Address)],
    });

    let imports = '';
    let displays = '';
    response1.forEach((contract, i) => {
      imports += `import ${contract.name} from ${address}\n`;
      displays += `
      answer.append(CollectionDisplay(
        _contractName: "${contract.name}",
        _name: ${contract.name}.getCollectionAttribute(key: "name") as! String,
        _description: ${contract.name}.getCollectionAttribute(key: "description") as! String,
        _image: ${contract.name}.getCollectionAttribute(key: "image") as! MetadataViews.IPFSFile
      ))\n
      `;
    });
    const script = replaceWithProperValues(getContractDisplaysScript)
      .replace('// IMPORTS', imports)
      .replace('// DISPLAYS', displays);

    const response2 = await fcl.query({
      cadence: script,
      args: (arg, t) => [],
    });

    return response2;
  } catch (e) {
    console.log(e);
  }
};

export const getCollectionInfo = async (contractName, contractAddress) => {
  const script = replaceWithProperValues(getCollectionInfoScript, contractName, contractAddress);

  try {
    const response = await fcl.query({
      cadence: script,
      args: (arg, t) => [],
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export async function getNextMetadataId(contractName, userAddress) {
  try {
    const response = await fcl.query({
      cadence: `
      import ${contractName} from ${userAddress}

      pub fun main(): UInt64 {
        return ${contractName}.nextMetadataId
      }
      `,
      args: (arg, t) => [],
    });

    return Number(response);
  } catch (e) {
    console.log(e);
  }
}

export async function checkRequiredVerifiers(contractName, contractAddress, userAddress) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(checkRequiredVerifiersScript, contractName, contractAddress),
      args: (arg, t) => [arg(userAddress, t.Address)],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getNFTInfo(contractName, contractAddress, metadataId) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getNFTInfoScript, contractName, contractAddress),
      args: (arg, t) => [arg(metadataId, t.UInt64)],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function hasEmeraldPass(user) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(hasEmeraldPassScript),
      args: (arg, t) => [arg(user, t.Address)],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function canMakeReservation(contractName) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(canMakeReservationScript),
      args: (arg, t) => [arg(contractName, t.String)],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

