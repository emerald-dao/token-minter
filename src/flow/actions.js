import { browser } from '$app/env';
import { get } from 'svelte/store';
import { Buffer } from 'buffer';

import * as fcl from '@onflow/fcl';
import './config';

import { user, transactionStatus, transactionInProgress, uploadingStatus, uploadingInProgress, contractInfo, contractCode } from './stores';
import { resultCID } from "$lib/stores/generator/IPFSstore.ts";

import { csvMetadata } from "$lib/stores/generator/CsvStore.ts";

// Cadence code
import getCollectionInfoScript from "./cadence/scripts/get_collection_info.cdc?raw";

if (browser) {
  // set Svelte $user store to currentUser,
  // so other components can access it
  fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();

export const getContracts = async (address) => {
  try {
    const response = await fcl.query({
      cadence: `
      pub fun main(account: Address): [String] {
        let contracts = getAccount(account).contracts
        let answer: [String] = []
        
        for contractName in contracts.names {
          answer.append(String.encodeHex(contracts.get(name: contractName)!.code))
        }
      
        return answer
      }
      `,
      args: (arg, t) => [
        arg(address, t.Address)
      ],
    });

    const contractCodes = response.map(thing => Buffer.from(thing, 'hex').toString());
    const createdByTouchstone = contractCodes.filter(thing => thing.includes("// CREATED BY: Touchstone (https://touchstone.city/), a platform crafted by your best friends at Emerald City DAO (https://ecdao.org/)."));
    console.log(createdByTouchstone);
    return createdByTouchstone;
  } catch (e) {
    console.log(e);
  }
};

export const getCollectionInfo = async (contractName, contractAddress) => {
  const script = getCollectionInfoScript
    .replace('"../ExampleNFT.cdc"', contractAddress)
    .replaceAll('ExampleNFT', contractName)
  console.log(script)
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

export const getUnpurchasedNFTs = async (contractName) => {
  try {
    const response = await fcl.query({
      cadence: `
      import ${contractName} from ${get(user).addr}

      pub fun main(accountAddr: Address, contractName: String): [${contractName}.NFTMetadata] {
        return ${contractName}.getUnpurchasedNFTs().values
      }
      `,
      args: (arg, t) => [],
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

function switchNetwork(network) {
  if (network === 'emulator') {
    fcl
      .config()
      .put('accessNode.api', 'http://localhost:8080')
      .put('discovery.wallet', 'http://localhost:8701/fcl/authn')
  } else if (network === 'testnet') {
    fcl
      .config()
      .put('accessNode.api', 'https://rest-testnet.onflow.org')
      .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn');
  } else if (network === 'mainnet') {
    fcl
      .config()
      .put('accessNode.api', 'https://rest-mainnet.onflow.org')
      .put('discovery.wallet', 'https://fcl-discovery.onflow.org/authn');
  }
}

export const deployToTestnet = async () => {
  switchNetwork('testnet');
  deployContract();
};

export const deployToMainnet = async () => {
  switchNetwork('mainnet');
  deployContract();
};

async function deployContract() {
  initTransactionState();
  const hexCode = Buffer.from(get(contractCode)).toString('hex');
  const info = get(contractInfo);

  try {
    const transactionId = await fcl.mutate({
      cadence: `
      transaction(
        contractName: String,
        description: String,
        imageHash: String,
        minting: Bool,
        price: UFix64,
        ipfsCID: String,
        contractCode: String
      ) {
        prepare(deployer: AuthAccount) {
          log(contractCode)
          deployer.contracts.add(
            name: contractName, 
            code: contractCode.decodeHex(),
            _name: contractName,
            _description: description,
            _image: imageHash,
            _minting: minting,
            _price: price,
            _ipfsCID: ipfsCID
          )
        }
      }
      `,
      args: (arg, t) => [
        arg(info.name, t.String),
        arg(info.description, t.String),
        arg(info.imageHash, t.String),
        arg(info.startMinting, t.Bool),
        arg(Number(info.payment).toFixed(2), t.UFix64),
        arg(get(resultCID), t.String),
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
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
  }
}

function initTransactionState() {
  transactionInProgress.set(true);
  transactionStatus.set(-1);
}

const getNextMetadataId = async (contractName, userAddress) => {
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

// Function to upload metadata to the contract in batches of 500
export async function uploadMetadataToContract(contractName) {
  const BATCH_SIZE = 500;
  // TODO: implement uploadMetadataToContract

  const userAddr = get(user).addr;
  // Get The MetadataId we should start at
  const nextMetadataId = await getNextMetadataId(contractName, userAddr);
  const metadatas = get(csvMetadata).slice(nextMetadataId, nextMetadataId + BATCH_SIZE);
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

  console.log('Uploading metadata to the contract:', nextMetadataId, nextMetadataId + BATCH_SIZE);

  initTransactionState();
  uploadingInProgress.set(true);
  try {
    const transactionId = await fcl.mutate({
      cadence: `
      import ${contractName} from ${userAddr}

      // Put a batch of up to ${BATCH_SIZE} NFT Metadatas inside the contract

      transaction(names: [String], descriptions: [String], thumbnails: [String], extras: [{String: String}]) {
        let Administrator: &${contractName}.Administrator
        prepare(deployer: AuthAccount) {
          self.Administrator = deployer.borrow<&${contractName}.Administrator>(from: ${contractName}.AdministratorStoragePath)
                                ?? panic("This account has not deployed the contract.")
        }

        pre {
          names.length <= ${BATCH_SIZE}: 
            "There must be less than or equal to ${BATCH_SIZE} NFTMetadata being added at a time."
          names.length == descriptions.length && descriptions.length == thumbnails.length && thumbnails.length == extras.length:
            "You must pass in a same amount of each parameter."
        }

        execute {
          var i = 0
          while i < names.length {
            self.Administrator.createNFTMetadata(
              name: names[i], 
              description: descriptions[i], 
              thumbnailPath: thumbnails[i],
              extra: extras[i]
            )
            i = i + 1
          }
        }
      }
      `,
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
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
      console.log(res);
      if (res.status === 4) {
        if (res.statusCode === 0) {
          uploadingStatus.set({ success: true })
        } else {
          uploadingStatus.set({ success: false, error: res.errorMessage })
        }
        uploadingInProgress.set(false);
        setTimeout(() => transactionInProgress.set(false), 2000);
      }
    });
  } catch (e) {
    console.log(e);
    transactionStatus.set(99);
    uploadingStatus.set({ success: false, error: e })
    uploadingInProgress.set(false);
  }
}
