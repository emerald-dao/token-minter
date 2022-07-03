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

// send a script to get the NFT templates
export const getTemplates = async () => {
  try {
    const response = await fcl.query({
      cadence: `
        import ExampleNFT from ${get(user.addr)}

        pub fun main(): {UInt64: ExampleNFT.Template} {
          return ExampleNFT.getTemplates()
        }
      `,
      args: (arg, t) => [],
    });
    console.log(response);
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
      transaction(contractName: String, contractCode: String, description: String, imageHash: String, minting: Bool, price: UFix64) {
        prepare(deployer: AuthAccount) {
          log(contractCode)
          deployer.contracts.add(
            name: contractName, 
            code: contractCode.decodeHex(),
            _name: contractName,
            _description: description,
            _image: imageHash,
            _minting: minting,
            _price: price
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
        arg(Number(info.payment).toFixed(2), t.UFix64)
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });
    console.log({ transactionId });
    fcl.tx(transactionId).subscribe((res) => {
      transactionStatus.set(res.status);
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

  console.log('Uploading metadta to the contract:', firstTokenNumber, lastTokenNumber);
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
