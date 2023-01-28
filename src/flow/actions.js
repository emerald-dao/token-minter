import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { Buffer } from 'buffer';
import { activeStep } from '$stores/ActiveStepStore';
import * as fcl from '@onflow/fcl';
import './config';
import { user, transactionStatus, transactionInProgress, addresses } from '$stores/FlowStore';
import { contractInfo, contractCode } from '$stores/ContractStore';
import { resultCID } from '$stores/IPFSstore';
import { resolveAddressObject } from './utils';

///////////////
// Cadence code
///////////////

// Scripts
// v0
import getCollectionInfoScript from './cadence/scripts/v0/get_collection_info.cdc?raw';
import getContractsInBookScript from './cadence/scripts/v0/get_contracts_in_book.cdc?raw';
import getContractFromNameScript from './cadence/scripts/v0/get_contract_from_name.cdc?raw';
import getContractDisplaysScript from './cadence/scripts/v0/get_contract_displays.cdc?raw';
import getContractNamesScript from './cadence/scripts/v0/get_contracts.cdc?raw';
import checkRequiredVerifiersScript from './cadence/scripts/v0/check_required_verifiers.cdc?raw';
import getNFTInfoScript from './cadence/scripts/v0/get_nft_info.cdc?raw';
import hasEmeraldPassScript from './cadence/scripts/v0/has_emerald_pass.cdc?raw';
import canMakeReservationScript from './cadence/scripts/v0/can_make_reservation.cdc?raw';
import getTouchstonePurchasesScript from './cadence/scripts/v0/get_touchstone_purchases.cdc?raw';
import getClaimableNFTsScript from './cadence/scripts/v0/get_claimable_nfts.cdc?raw';
import getEmeraldIDBatchScript from './cadence/scripts/v0/get_emeraldid_batch.cdc?raw';
// v1
import getVersionScript from './cadence/scripts/v1/get_version.cdc?raw';
// v2
import getMetadataScript from './cadence/scripts/v2/get_metadata.cdc?raw';
import getOwnedContractNamesScript from './cadence/scripts/v2/get_owned_contract_names.cdc?raw';
import getAllContractNamesScript from './cadence/scripts/v2/get_all_contract_names.cdc?raw';

// Transactions
// v0
import createMetadatasTx from './cadence/transactions/v0/create_metadatas.cdc?raw';
import deployContractTx from './cadence/transactions/v0/deploy_contract.cdc?raw';
import purchaseNFTTx from './cadence/transactions/v0/purchase_nft.cdc?raw';
import removeContractFromBookTx from './cadence/transactions/v0/remove_contract_from_book.cdc?raw';
import airdropTx from './cadence/transactions/v0/airdrop.cdc?raw';
import toggleMintingTx from './cadence/transactions/v0/toggle_minting.cdc?raw';
import proposeNFTToCatalogTx from './cadence/transactions/v0/propose_nft_to_catalog.cdc?raw';
import setupCollectionTx from './cadence/transactions/v0/setup_collection.cdc?raw';
import claimNFTsTx from './cadence/transactions/v0/claim_nfts.cdc?raw';
// v1
import createMetadatasTxv1 from './cadence/transactions/v1/create_metadatas.cdc?raw';
import purchaseNFTTxv1 from './cadence/transactions/v1/purchase_nft.cdc?raw';
import airdropTxv1 from './cadence/transactions/v1/airdrop.cdc?raw';
// v2
import createMetadatasTxv2 from './cadence/transactions/v2/create_metadatas.cdc?raw';
import createPackTxv2 from './cadence/transactions/v2/create_pack.cdc?raw';
import purchaseNFTTxv2 from './cadence/transactions/v2/purchase_nft.cdc?raw';
import purchasePackTxv2 from './cadence/transactions/v2/purchase_pack.cdc?raw';

const latestVersion = '2';

if (browser) {
  // set Svelte $user store to currentUser,
  // so other components can access it
  fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();

function initTransactionState() {
  transactionInProgress.set(true);
  transactionStatus.set({ status: -1 });
}

export function replaceWithProperValues(script, contractName = '', contractAddress = '') {
  const addressList = addresses;
  return script
    .replace('"../../ExampleNFT.cdc"', contractAddress)
    .replace('"../../utility/NonFungibleToken.cdc"', addressList.NonFungibleToken)
    .replace('"../../utility/MetadataViews.cdc"', addressList.MetadataViews)
    .replace('"../../utility/FlowToken.cdc"', addressList.FlowToken)
    .replace('"../../utility/FUSD.cdc"', addressList.FUSD)
    .replace('"../../utility/FungibleToken.cdc"', addressList.FungibleToken)
    .replace('"./utility/NonFungibleToken.cdc"', addressList.NonFungibleToken)
    .replace('"./utility/MetadataViews.cdc"', addressList.MetadataViews)
    .replace('"./utility/FungibleToken.cdc"', addressList.FungibleToken)
    .replace('"./utility/FlowToken.cdc"', addressList.FlowToken)
    .replace('"./utility/FUSD.cdc"', addressList.FUSD)
    .replace('"./MintVerifiers.cdc"', addressList.MintVerifiers)
    .replace('"./utility/EmeraldPass.cdc"', addressList.EmeraldPass)
    .replace('"../../MintVerifiers.cdc"', addressList.MintVerifiers)
    .replace('"../../utility/FLOAT.cdc"', addressList.FLOAT)
    .replace('"../../utility/EmeraldPass.cdc"', addressList.EmeraldPass)
    .replace('"../../utility/NFTCatalog.cdc"', addressList.NFTCatalog)
    .replace('"../../utility/EmeraldIdentity.cdc"', addressList.EmeraldID)
    .replace('"../../utility/EmeraldIdentityDapper.cdc"', addressList.EmeraldID)
    .replace('"../../utility/EmeraldIdentityLilico.cdc"', addressList.EmeraldID)
    .replaceAll('0x5643fd47a29770e7', addressList.ECTreasury)
    .replaceAll('ExampleNFT', contractName);
}

// ****** Transactions ****** //

export async function deployContract() {
  const hexCode = Buffer.from(get(contractCode)).toString('hex');
  let info = get(contractInfo);
  console.log(info);

  initTransactionState();

  // Singular FLOAT Verifier
  let eventOwner = null;
  let eventId = null;
  if (info.floatLink) {
    const cutLink = info.floatLinkText.replace('https://floats.city/', '').replace('https://testnet.floats.city/', ''); // jacob.find/event/376102041
    eventOwner = cutLink.substring(0, cutLink.indexOf('/'));
    eventOwner = (await resolveAddressObject(eventOwner)).address;
    eventId = cutLink.substring(cutLink.indexOf('/event/') + 7);
  }

  let socials = [];
  if (info.discord) socials.push({ key: 'discord', value: info.discord });
  if (info.twitter) socials.push({ key: 'twitter', value: info.twitter });
  if (info.website) socials.push({ key: 'website', value: info.website });

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(deployContractTx),
      args: (arg, t) => [
        arg(info.contractName, t.String),
        arg(info.name, t.String),
        arg(info.description, t.String),
        arg(info.imageName, t.String),
        arg(info.bannerImageName ? info.bannerImageName : null, t.Optional(t.String)),
        arg(Number(info.payment).toFixed(3), t.UFix64),
        arg(info.paymentType, t.String),
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
        arg(eventOwner, t.Optional(t.Address)),
        arg(eventId, t.Optional(t.UInt64)),
        arg(info.floatLinkText, t.Optional(t.String)),
        // Has Emerald Pass Verifier
        arg(info.requireEmeraldPass, t.Bool),
        // Contract Code
        arg(hexCode, t.String),
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });

    fcl.tx(transactionId).subscribe(async (res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        // If deployment is successful
        if (res.statusCode === 0) {
          console.log('Successfully deployed the contract.');
          const response = await fetch('/api/add-project.js', {
            method: 'POST',
            body: JSON.stringify({ contractName: info.contractName, user: get(user), version: latestVersion }),
            headers: {
              'content-type': 'application/json'
            }
          });
          console.log('Response', response);
          // TODO: Take outside the onNext from this function
          activeStep.onNext();
        }
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
  }
}

export const purchaseNFT = async (metadataId, price, serial, contractName, contractAddress, paymentType) => {
  let vaultType = '';
  let storagePath = '';
  if (paymentType == "$FLOW") {
    vaultType = "FlowToken.Vault";
    storagePath = "flowTokenVault";
  } else if (paymentType == "$FUSD") {
    vaultType = "FUSD.Vault";
    storagePath = "fusdVault";
  }

  const version = await getVersion(contractName, contractAddress);
  let transaction;
  let args;
  if (version == 0) {
    transaction = replaceWithProperValues(purchaseNFTTx, contractName, contractAddress)
      .replaceAll('FungibleToken.Vault', vaultType)
      .replace('PAYMENT_PATH', storagePath);
    args = (arg, t) => [
      arg(metadataId, t.UInt64),
      arg(price, t.UFix64),
      arg(contractName, t.String),
      arg(contractAddress, t.Address)
    ]
  } else if (version == 1) {
    transaction = replaceWithProperValues(purchaseNFTTxv1, contractName, contractAddress)
      .replaceAll('FungibleToken.Vault', vaultType)
      .replace('PAYMENT_PATH', storagePath);
    args = (arg, t) => [
      arg(metadataId, t.UInt64),
      arg(price, t.UFix64),
      arg(serial, t.UInt64),
      arg(contractName, t.String),
      arg(contractAddress, t.Address)
    ]
  } else if (version == 2) {
    transaction = replaceWithProperValues(purchaseNFTTxv2, contractName, contractAddress)
      .replaceAll('FungibleToken.Vault', vaultType)
      .replace('PAYMENT_PATH', storagePath);
    args = (arg, t) => [
      arg(metadataId, t.UInt64),
      arg(price, t.UFix64),
      arg(serial, t.UInt64),
      arg(contractName, t.String),
      arg(contractAddress, t.Address)
    ]
  } else {
    return;
  }

  initTransactionState();

  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: transaction,
        args,
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 9999,
      });
      console.log({ transactionId });
      fcl.tx(transactionId).subscribe((res) => {
        transactionStatus.set(res);
        console.log(res);
        if (res.status === 4) {
          setTimeout(() => transactionInProgress.set(false), 2000);
          setTimeout(() => transactionStatus.set({}), 5000);
          resolve(true);
        }
      });
    } catch (e) {
      console.log(e);
      transactionInProgress.set(false);
      transactionStatus.set({});
      reject(false);
    }
  });
};

export const purchasePack = async (metadataId, price, contractName, contractAddress, paymentType) => {
  let vaultType = '';
  let storagePath = '';
  if (paymentType == "$FLOW") {
    vaultType = "FlowToken.Vault";
    storagePath = "flowTokenVault";
  } else if (paymentType == "$FUSD") {
    vaultType = "FUSD.Vault";
    storagePath = "fusdVault";
  }

  const version = await getVersion(contractName, contractAddress);

  if (version != 2) {
    return
  }
  const transaction = replaceWithProperValues(purchasePackTxv2, contractName, contractAddress)
    .replaceAll('FungibleToken.Vault', vaultType)
    .replace('PAYMENT_PATH', storagePath);
  const args = (arg, t) => [
    arg(metadataId, t.UInt64),
    arg(price, t.UFix64),
    arg(contractName, t.String),
    arg(contractAddress, t.Address)
  ]
  initTransactionState();

  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: transaction,
        args,
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 9999,
      });
      console.log({ transactionId });
      fcl.tx(transactionId).subscribe((res) => {
        transactionStatus.set(res);
        console.log(res);
        if (res.status === 4) {
          setTimeout(() => transactionInProgress.set(false), 2000);
          setTimeout(() => transactionStatus.set({}), 5000);
          resolve(true);
        }
      });
    } catch (e) {
      console.log(e);
      transactionInProgress.set(false);
      transactionStatus.set({});
      reject(false);
    }
  });
};

export async function uploadToContract(contractName, metadatas, batchSize, ipfsCID, uploadType) {
  initTransactionState();

  const userAddr = get(user).addr;

  const version = await getVersion(contractName, userAddr);
  console.log(uploadType)
  if (uploadType === 'NFT') {
    uploadMetadataToContract(contractName, userAddr, metadatas, batchSize, ipfsCID, version);
  } else if (uploadType === 'Pack') {
    uploadPackToContract(contractName, userAddr, metadatas, batchSize, ipfsCID, version);
  }
}

// Function to upload metadata to the contract in batches of 500
async function uploadMetadataToContract(contractName, contractAddress, metadatas, batchSize, ipfsCID, version) {
  // Get The MetadataId we should start at
  let names = [];
  let descriptions = [];
  let images = [];
  let thumbnails = [];
  let prices = [];
  let extras = [];
  let supplys = [];
  for (var i = 0; i < metadatas.length; i++) {
    // We just take serial out here so its not counted
    const { name, description, image, thumbnail, price, supply, serial, ...rest } = metadatas[i];
    names.push(name);
    descriptions.push(description);
    images.push(image);
    thumbnails.push(thumbnail);
    prices.push(price ? Number(price).toFixed(3) : null);
    supplys.push(supply || 1);
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

  let transaction;
  let args;
  if (version == 0) {
    transaction = replaceWithProperValues(createMetadatasTx, contractName, contractAddress).replaceAll('500', batchSize)
    args = (arg, t) => [
      arg(names, t.Array(t.String)),
      arg(descriptions, t.Array(t.String)),
      arg(images, t.Array(t.String)),
      arg(thumbnails, t.Array(t.Optional(t.String))),
      arg(prices, t.Array(t.Optional(t.UFix64))),
      arg(extras, t.Array(t.Dictionary({ key: t.String, value: t.String }))),
      arg(ipfsCID, t.String)
    ]
  } else if (version == 1) {
    transaction = replaceWithProperValues(createMetadatasTxv1, contractName, contractAddress).replaceAll('500', batchSize)
    args = (arg, t) => [
      arg(names, t.Array(t.String)),
      arg(descriptions, t.Array(t.String)),
      arg(images, t.Array(t.String)),
      arg(thumbnails, t.Array(t.Optional(t.String))),
      arg(prices, t.Array(t.Optional(t.UFix64))),
      arg(extras, t.Array(t.Dictionary({ key: t.String, value: t.String }))),
      arg(supplys, t.Array(t.UInt64)),
      arg(ipfsCID, t.String)
    ]
  } else if (version == 2) {
    transaction = replaceWithProperValues(createMetadatasTxv2, contractName, contractAddress).replaceAll('500', batchSize)
    args = (arg, t) => [
      arg(names, t.Array(t.String)),
      arg(descriptions, t.Array(t.String)),
      arg(images, t.Array(t.String)),
      arg(thumbnails, t.Array(t.Optional(t.String))),
      arg(prices, t.Array(t.Optional(t.UFix64))),
      arg(extras, t.Array(t.Dictionary({ key: t.String, value: t.String }))),
      arg(supplys, t.Array(t.UInt64)),
      arg(ipfsCID, t.String)
    ]
  } else {
    return;
  }

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });

    const { status, statusCode, errorMessage } = await fcl.tx(transactionId).onceSealed();
    if (status === 4 && statusCode === 0) {
      return { success: true };
    }
    return { success: false, error: errorMessage };
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
    return { success: false, error: e };
  }
}

// Only works for v2
async function uploadPackToContract(contractName, contractAddress, metadatas, batchSize, ipfsCID, version) {
  if (version != 2) return;
  const nextMetadataId = await getNextMetadataId(contractName, contractAddress);
  const { name, description, image, thumbnail, price, supply, serial, ...rest } = metadatas.shift();
  const packPrice = price ? Number(price).toFixed(3) : null;
  const packSupply = supply || 1;
  let packExtra = [];
  for (const attribute in rest) {
    if (rest[attribute]) {
      packExtra.push({ key: attribute, value: rest[attribute] });
    }
  }
  // Figure out number of elements per basket
  const numOfElements = metadatas.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.supply || 1),
    0
  );
  const numOfElementsPerPack = numOfElements / packSupply;

  let baskets = [];
  for (var n = 0; n < packSupply; n++) {
    baskets.push([]);
  }

  // Get The MetadataId we should start at
  let names = [];
  let descriptions = [];
  let images = [];
  let thumbnails = [];
  let prices = [];
  let extras = [];
  let supplys = [];
  for (var i = 0; i < metadatas.length; i++) {
    // We just take serial out here so its not counted
    const { name, description, image, thumbnail, price, supply, serial, ...rest } = metadatas[i];
    names.push(name);
    descriptions.push(description);
    images.push(image);
    thumbnails.push(thumbnail);
    prices.push(price ? Number(price).toFixed(3) : null);
    const nftSupply = supply || 1;
    supplys.push(nftSupply);
    let extra = [];
    for (const attribute in rest) {
      if (rest[attribute]) {
        extra.push({ key: attribute, value: rest[attribute] });
      }
    }
    extras.push(extra);
    for (var j = 0; j < nftSupply; j++) {
      const available = baskets.filter(basket => {
        return basket.length != numOfElementsPerPack
      });
      let basket = available[Math.floor(Math.random() * available.length)];
      basket.push({ fields: [{ name: "metadataId", value: i + nextMetadataId }, { name: "serial", value: j }] })
    }
  }

  console.log(baskets)

  let transaction = replaceWithProperValues(createPackTxv2, contractName, contractAddress).replaceAll('500', batchSize)
  let args = (arg, t) => [
    arg(name, t.String),
    arg(description, t.String),
    arg(image, t.String),
    arg(thumbnail, t.Optional(t.String)),
    arg(packPrice, t.Optional(t.UFix64)),
    arg(packExtra, t.Dictionary({ key: t.String, value: t.String })),
    arg(packSupply, t.UInt64),
    arg(names, t.Array(t.String)),
    arg(descriptions, t.Array(t.String)),
    arg(images, t.Array(t.String)),
    arg(thumbnails, t.Array(t.Optional(t.String))),
    arg(extras, t.Array(t.Dictionary({ key: t.String, value: t.String }))),
    arg(supplys, t.Array(t.UInt64)),
    arg(ipfsCID, t.String),
    arg(baskets, t.Array(t.Array(t.Struct(`A.${contractAddress.replace(/^0x/, '')}.${contractName}.Identifier`, [
      { name: "metadataId", value: t.UInt64 },
      { name: "serial", value: t.UInt64 },
    ],))))
  ]

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });

    const { status, statusCode, errorMessage } = await fcl.tx(transactionId).onceSealed();
    if (status === 4 && statusCode === 0) {
      return { success: true };
    }
    return { success: false, error: errorMessage };
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
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
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
  }
};

export const airdrop = async (recipients, metadataIds, serials, contractName, contractAddress) => {
  initTransactionState();

  const version = await getVersion(contractName, contractAddress);
  let transaction;
  let args;
  if (version == 0) {
    transaction = replaceWithProperValues(airdropTx, contractName, contractAddress)
    args = (arg, t) => [arg(recipients, t.Array(t.Address)), arg(metadataIds, t.Array(t.UInt64))]
  } else if (version == 1) {
    transaction = replaceWithProperValues(airdropTxv1, contractName, contractAddress)
    args = (arg, t) => [arg(recipients, t.Array(t.Address)), arg(metadataIds, t.Array(t.UInt64)), arg(serials, t.Array(t.UInt64))]
  } else {
    return;
  }

  try {
    const transactionId = await fcl.mutate({
      cadence: transaction,
      args,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
  }
};

export const claimNFTs = async (contractName, contractAddress) => {
  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(claimNFTsTx, contractName, contractAddress),
      args: (arg, t) => [arg(contractName, t.String), arg(contractAddress, t.Address)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
  }
};

export const toggleMinting = async (contractName, contractAddress) => {
  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(toggleMintingTx, contractName, contractAddress),
      args: (arg, t) => [],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
  }
};

export const proposeNFTToCatalog = async (contractName, contractAddress) => {
  initTransactionState();

  const { NonFungibleToken, MetadataViews } = addresses;
  const publicLinkedTypeRestrictions = [
    `A.${NonFungibleToken.slice(2)}.NonFungibleToken.CollectionPublic`,
    `A.${NonFungibleToken.slice(2)}.NonFungibleToken.Receiver`,
    `A.${MetadataViews.slice(2)}.MetadataViews.ResolverCollection`,
  ];
  const privateLinkedTypeRestrictions = publicLinkedTypeRestrictions.concat(
    `A.${NonFungibleToken.slice(2)}.NonFungibleToken.Provider`
  );

  try {
    const transactionId = await fcl.mutate({
      cadence: replaceWithProperValues(proposeNFTToCatalogTx, contractName, contractAddress),
      args: (arg, t) => [
        arg(contractName, t.String),
        arg(contractAddress, t.Address),
        arg(publicLinkedTypeRestrictions, t.Array(t.String)),
        arg(privateLinkedTypeRestrictions, t.Array(t.String)),
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
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
      transactionStatus.set(res);
      console.log(res);
      if (res.status === 4) {
        setTimeout(() => transactionInProgress.set(false), 2000);
        setTimeout(() => transactionStatus.set({}), 5000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionInProgress.set(false);
    transactionStatus.set({});
  }
};

// ****** Scripts ****** //

export const getAllContractNames = async (address) => {
  try {
    const response = await fcl.query({
      cadence: getContractNamesScript,
      args: (arg, t) => [arg(address, t.Address)],
    });

    return response.map((element) => element.name);
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

export const getCollectionAddressFromName = async (contractName) => {
  try {
    const contractAddress = await fcl.query({
      cadence: replaceWithProperValues(getContractFromNameScript),
      args: (arg, t) => [
        arg(contractName, t.String)
      ],
    });

    console.log(contractAddress);

    return contractAddress;
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

export async function getOwnedContractNames(user) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getOwnedContractNamesScript),
      args: (arg, t) => [
        arg(user, t.Address)
      ],
    });

    return response;
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
    return [];
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

export async function getMetadata(contractName, contractAddress, metadataId) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getMetadataScript, contractName, contractAddress),
      args: (arg, t) => [arg(metadataId, t.UInt64)],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllContractNamesInBook() {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getAllContractNamesScript),
      args: (arg, t) => [],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getClaimableNFTs(contractName, contractAddress, user) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getClaimableNFTsScript, contractName, contractAddress),
      args: (arg, t) => [arg(user, t.Address)],
    });

    console.log(response)

    return response;
  } catch (e) {
    console.log(e);
    return {};
  }
}

export async function hasEmeraldPass(user) {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(hasEmeraldPassScript),
      args: (arg, t) => [arg(user, t.Address)],
    });

    console.log('[EMERALD PASS]: ', response);
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

export const getTouchstonePurchases = async (user) => {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getTouchstonePurchasesScript),
      args: (arg, t) => [
        arg(user, t.Address)
      ],
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getEmeraldIDBatch = async (users) => {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getEmeraldIDBatchScript),
      args: (arg, t) => [
        arg(users, t.Array(t.Address))
      ],
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getVersion = async (contractName, contractAddress) => {
  try {
    const response = await fcl.query({
      cadence: replaceWithProperValues(getVersionScript, contractName, contractAddress),
      args: (arg, t) => []
    })

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}
