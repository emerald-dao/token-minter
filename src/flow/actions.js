import { browser } from '$app/env';
import { get } from 'svelte/store';
import { Buffer } from 'buffer';

import * as fcl from '@onflow/fcl';
import './config';

import { user, transactionStatus, transactionInProgress, contractInfo, contractCode } from './stores';
import { resultCID } from "$lib/stores/generator/IPFSstore.ts";

if (browser) {
  // set Svelte $user store to currentUser,
  // so other components can access it
  fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = () => fcl.logIn();
export const signUp = () => fcl.signUp();

export const getCollectionInfo = async (contractName, userAddress) => {
  try {
    const response = await fcl.query({
      cadence: `
      import ${contractName} from ${userAddress}

      pub fun main(): CollectionInfo {
        return CollectionInfo(
          name: ${contractName}.name,
          description: ${contractName}.description,
          image: ${contractName}.image,
          ipfsCID: ${contractName}.ipfsCID
          price: ${contractName}.price,
          unpurchasedNFTs: ${contractName}.getUnpurchasedNFTs()
        )
      }

      pub struct CollectionInfo {
        pub let name: String
        pub let description: String
        pub let image: String
        pub let ipfsCID: String
        pub let price: UFix64
        pub let unpurchasedNFTs: {UInt64: ${contractName}.NFTMetadata}

        init(
          name: String, 
          description: String, 
          image: String, 
          ipfsCID: String, 
          price: UFix64,
          unpurchasedNFTs: {UInt64: ${contractName}.NFTMetadata}
        ) {
          self.name = name
          self.description = description
          self.image = image
          self.ipfsCID = ipfsCID
          self.price = price
          self.unpurchasedNFTs = unpurchasedNFTs
        }
      }
      `,
      args: (arg, t) => [],
    });

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

      pub fun main(accountAddr: Address, contractName: String): [${contractName}.Template] {
        return ${contractName}.getUnpurchasedTemplates().values
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
  if (network === 'testnet') {
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

// Function to upload metadata to the contract in batches of 500
export async function uploadMetadataToContract(firstTokenNumber, lastTokenNumber) {
  // TODO: implement uploadMetadataToContract

  console.log('Uploading metadata to the contract:', firstTokenNumber, lastTokenNumber);
  const timer = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'Metadata uploaded successfully',
      });
    }, 2000);
  });

  return await timer;
}
