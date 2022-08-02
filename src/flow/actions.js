import { browser } from '$app/env';
import { get } from 'svelte/store';
import { Buffer } from 'buffer';

import * as fcl from '@onflow/fcl';
import './config';

import { user, transactionStatus, transactionInProgress, contractInfo, contractCode, addresses, network } from './stores';
import { resultCID } from "$lib/stores/generator/IPFSstore.ts";

import { onNext, saveFileInStore } from '$lib/stores/generator/updateFunctions';

///////////////
// Cadence code 
///////////////
// Scripts
import getCollectionInfoScript from "./cadence/scripts/get_collection_info.cdc?raw";
import getContractsScript from "./cadence/scripts/get_contracts.cdc?raw";
import getContractDisplaysScript from "./cadence/scripts/get_contract_displays.cdc?raw";
import checkRequiredVerifiersScript from "./cadence/scripts/check_required_verifiers.cdc?raw";
// Transactions
import createMetadatasTx from "./cadence/transactions/create_metadatas.cdc?raw";
import deployContractTx from "./cadence/transactions/deploy_contract.cdc?raw";
import purchaseNFTTx from "./cadence/transactions/purchase_nft.cdc?raw";
import { resolveAddressObject } from './utils';

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
      .put('discovery.wallet', 'http://localhost:8701/fcl/authn')
  } else if (newNetwork === 'testnet') {
    fcl
      .config()
      .put('accessNode.api', 'https://rest-testnet.onflow.org')
      .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn');
  } else if (newNetwork === 'mainnet') {
    fcl
      .config()
      .put('accessNode.api', 'https://rest-mainnet.onflow.org')
      .put('discovery.wallet', 'https://fcl-discovery.onflow.org/authn');
  }
  saveFileInStore(network, newNetwork)
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
    .replace('"./utility/NonFungibleToken.cdc"', addressList.NonFungibleToken)
    .replace('"./utility/MetadataViews.cdc"', addressList.MetadataViews)
    .replace('"./utility/FungibleToken.cdc"', addressList.FungibleToken)
    .replace('"./utility/FlowToken.cdc"', addressList.FlowToken)
    .replace('"./MintVerifiers.cdc"', addressList.MintVerifiers)
    .replace('"../MintVerifiers.cdc"', addressList.MintVerifiers)
    .replace('"../utility/FLOAT.cdc"', addressList.FLOAT)
    .replaceAll('0x5643fd47a29770e7', addressList.ECTreasury)
    .replaceAll('ExampleNFT', contractName);
}

// ****** Transactions ****** //

async function deployContract() {
  const hexCode = Buffer.from(get(contractCode)).toString('hex');
  const info = get(contractInfo);

  initTransactionState();

  let eventOwner = null;
  let eventId = null;
  if (info.floatLink) {
    const cutLink = info.floatLinkText.replace('https://floats.city/', ''); // jacob.find/event/376102041
    eventOwner = cutLink.substring(0, cutLink.indexOf('/'));
    eventOwner = (await resolveAddressObject(eventOwner)).address;
    eventId = cutLink.substring(cutLink.indexOf('/event/') + 7);
  }

  console.log('[Verifier: FLOAT] Event Owner', eventOwner);
  console.log('[Verifier: FLOAT] Event Id', eventId);

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(deployContractTx),
      args: (arg, t) => [
        arg(info.name.replace(/\s+/g, ''), t.String),
        arg(info.name, t.String),
        arg(info.description, t.String),
        arg(info.image.name, t.String),
        arg(info.startMinting, t.Bool),
        arg(Number(info.payment).toFixed(2), t.UFix64),
        arg(get(resultCID), t.String),
        arg(info.floatLink, t.Bool),
        arg(eventOwner, t.Optional(t.Address)),
        arg(eventId, t.Optional(t.UInt64)),
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
          console.log("Successfully deployed the contract.")
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
  const transaction = replaceWithProperValues(purchaseNFTTx, contractName, contractAddress)

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args: (arg, t) => [
        arg(serial, t.UInt64),
        arg(price, t.UFix64)
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
}

// Function to upload metadata to the contract in batches of 500
export async function uploadMetadataToContract(contractName, metadatas, batchSize) {
  const userAddr = get(user).addr;
  // Get The MetadataId we should start at
  let names = [];
  let descriptions = [];
  let thumbnails = [];
  let extras = [];
  for (var i = 0; i < metadatas.length; i++) {
    const { name, description, image, ...rest } = metadatas[i];
    names.push(name);
    descriptions.push(description);
    thumbnails.push(image);
    let extra = [];
    for (const attribute in rest) {
      extra.push({ key: attribute, value: rest[attribute] });
    }
    extras.push(extra);
  }

  console.log('Uploading ' + batchSize + ' NFTs to the contract.')

  const transaction = replaceWithProperValues(createMetadatasTx, contractName, userAddr)
    .replaceAll('500', batchSize);

  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args: (arg, t) => [
        arg(names, t.Array(t.String)),
        arg(descriptions, t.Array(t.String)),
        arg(thumbnails, t.Array(t.String)),
        arg(extras, t.Array(t.Dictionary({ key: t.String, value: t.String })))
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
    return { success: false, error: e }
  }
}

// ****** Scripts ****** //

export const getContracts = async (address) => {
  try {
    const response1 = await fcl.query({
      cadence: getContractsScript,
      args: (arg, t) => [
        arg(address, t.Address)
      ],
    });

    const createdByTouchstone = response1.filter(contract => {
      const contractCode = Buffer.from(contract.code, 'hex').toString()
      return contractCode.includes("// CREATED BY: Touchstone (https://touchstone.city/), a platform crafted by your best friends at Emerald City DAO (https://ecdao.org/).") &&
        contractCode.includes("// STATEMENT: This contract promises to keep the 5% royalty off of primary sales to Emerald City DAO or risk permanent suspension from participation in the DAO and its tools.")
    });

    let imports = '';
    let displays = '';
    createdByTouchstone.forEach((contract, i) => {
      imports += `import ${contract.name} from ${address}\n`;
      displays += `
      let display${i} = ${contract.name}.getCollectionInfo()
      answer.append(CollectionDisplay(
        _name: display${i}.name,
        _description: display${i}.description,
        _image: display${i}.image
      ))\n
      `
    })
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
};

export async function checkRequiredVerifiers(contractName, contractAddress, userAddress) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(checkRequiredVerifiersScript, contractName, contractAddress),
      args: (arg, t) => [
        arg(userAddress, t.Address)
      ],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};