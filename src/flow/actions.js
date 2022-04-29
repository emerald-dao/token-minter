import { browser } from '$app/env';
import { get } from 'svelte/store';

import * as fcl from "@samatech/onflow-fcl-esm";
import "./config";
import { user, profile, transactionStatus, transactionInProgress, contractInfo, contractCode } from './stores';

if (browser) {
  // set Svelte $user store to currentUser, 
  // so other components can access it
  fcl.currentUser.subscribe(user.set, [])
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate()
export const logIn = () => fcl.logIn()
export const signUp = () => fcl.signUp()

// send a transaction to get a user's profile
export const sendQuery = async (addr) => {
  let profileQueryResult = false;

  try {
    profileQueryResult = await fcl.query({
      cadence: `
        import Profile from 0xProfile
  
        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      args: (arg, t) => [arg(addr, t.Address)]
    })
    console.log(profileQueryResult)
    profile.set(profileQueryResult);

  } catch(e) {
    console.log(e);
  }
}

export const deployContract = async () => {
  initTransactionState();
  const hexCode = Buffer.from(get(contractCode)).toString('hex');

  try {
    const transactionId = await fcl.mutate({
      cadence: `
      transaction(contractName: String, contractCode: String) {
        prepare(deployer: AuthAccount) {
          log(contractCode)
          deployer.contracts.add(name: contractName, code: contractCode.decodeHex())
        }
      }
      `,
      args: (arg, t) => [
        arg(get(contractInfo).name, t.String),
        arg(hexCode, t.String)
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999
    });
    console.log({transactionId});
    fcl.tx(transactionId).subscribe(res => {
      console.log(res)
      transactionStatus.set(res.status)
      if(res.status === 4) {
        setTimeout(() => transactionInProgress.set(false),2000)
      }
    })
  } catch(e) {
    console.log(e);
    transactionStatus.set(99)
  }
}

export const addMetadata = async () => {
  initTransactionState();

  try {
    const transactionId = await fcl.mutate({
      cadence: `
      import ExampleNFT from 0xe37a242dfff69bbc
      transaction() {
        prepare(signer: AuthAccount) {
          let metadata: {UInt64: ExampleNFT.Metadata} = {}
          var i: UInt64 = 0
          while i < 1000 {
            metadata[i] = ExampleNFT.Metadata(
              name: "Jacob",
              description: "",
              image: "",
              favNum: 0
            )
            i = i + 1
          }
          let admin: &ExampleNFT.Administrator = signer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)!
          admin.addMetadata(metadata: metadata)
        }
      }
      `,
      args: (arg, t) => [],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 7000
    });
    console.log({transactionId});
    fcl.tx(transactionId).subscribe(res => {
      console.log(res)
      transactionStatus.set(res.status)
      if(res.status === 4) {
        setTimeout(() => transactionInProgress.set(false),2000)
      }
    })
  } catch(e) {
    console.log(e);
    transactionStatus.set(99)
  }
}


function initTransactionState() {
  transactionInProgress.set(true);
  transactionStatus.set(-1);
}