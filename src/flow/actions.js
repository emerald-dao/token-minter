import { browser } from '$app/env';
import { get } from 'svelte/store';
import { Buffer } from 'buffer';

import * as fcl from '@onflow/fcl';
import './config';

import { user, transactionStatus, transactionInProgress, contractInfo, contractCode } from './stores';

if (browser) {
  // set Svelte $user store to currentUser,
  // so other components can access it
  fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = () => fcl.logIn();
export const signUp = () => fcl.signUp();

export const getCollectionInfo = async = (contractName) => {
  try {
    const response = await fcl.query({
      cadence: `
      import ${contractName} from ${get(user).addr}

      pub fun main(accountAddr: Address, contractName: String): CollectionInfo {
        return CollectionInfo(
          name: ${contractName}.name,
          description: ${contractName}.description,
          image: ${contractName}.image,
          price: ${contractName}.price
        )
      }

      pub struct CollectionInfo {
        pub let name: String
        pub let description: String
        pub let image: String
        pub let price: UFix64

        init(name: String, description: String, image: String, price: UFix64) {
          self.name = name
          self.description = description
          self.image = image
          self.price = price
        }
      }
      `,
      args: (arg, t) => []
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getTemplates = async () => {
  try {
    // TODO:
    // Get NFTs from the IPFS Upload
    // This will have to get the NFTs from IPFS
    const response = [
      {
        name: 'Cap1',
        description: 'White cap with petroman',
        thumbnail: 'QmakaeD3HArtCKLvy6PvYaQFNHZ92eW2d4MpSLkFSMzN38'
      },
      {
        name: 'Cap2',
        description: 'Purple cap with petroman',
        thumbnail: 'QmPnCLekhp9wjGC8SpDCBb5rVsT3npYojD45db9hgG5DRQ'
      },
      {
        name: 'Cap3',
        description: 'Green cap with deer',
        thumbnail: 'QmR5zDG6NUfseKCoZ2ou6ydRfaNRWS6gc9zeB8rKoGwrFQ'
      },
      {
        name: 'Cap4',
        description: 'Gray cap with petroman',
        thumbnail: 'QmSGSAUnXGBV7nYgSJidSUJAeY9mqGbCQyD6y5Q77KWmk2'
      }
    ];

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
        contractCode: String, 
        description: String, 
        imageHash: String, 
        minting: Bool, 
        price: UFix64, 
        ipfsStorage: String
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
            _ipfsStorage: ipfsStorage
          )
        }
      }
      `,
      args: (arg, t) => [
        arg(info.name, t.String),
        arg(hexCode, t.String),
        arg(info.description, t.String),
        arg(info.imageHash, t.String),
        arg(info.startMinting, t.Bool),
        arg(Number(info.payment).toFixed(2), t.UFix64),
        arg('', t.String)
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
