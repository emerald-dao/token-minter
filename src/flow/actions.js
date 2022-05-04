import { browser } from '$app/env';
import { get } from 'svelte/store';

import * as fcl from "@onflow/fcl";
import './config';

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

function initTransactionState() {
  transactionInProgress.set(true);
  transactionStatus.set(-1);
}