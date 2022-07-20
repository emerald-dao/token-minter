import { persistentWritable } from '$lib/stores/ThemeStore';
import { writable, get, derived } from 'svelte/store';
import { replaceWithProperValues } from './actions';
import contract from './cadence/ExampleNFT.cdc?raw';

const contractData = {
	NonFungibleToken: {
		testnet: "0x631e88ae7f1d7c20",
		mainnet: "0x1d7e57aa55817448"
	},
	MetadataViews: {
		testnet: "0x631e88ae7f1d7c20",
		mainnet: "0x1d7e57aa55817448"
	},
	FungibleToken: {
		testnet: "0x9a0766d93b6608b7",
		mainnet: "0xf233dcee88fe0abe"
	},
	FlowToken: {
		testnet: "0x7e60df042a9c0868",
		mainnet: "0x1654653399040a61"
	},
	ECTreasury: {
		testnet: "0x6c0d53c676256e8c",
		mainnet: "0x5643fd47a29770e7"
	}
}

export const user = writable(null);
export const network = writable('testnet');
export const profile = writable(null);
export const transactionStatus = writable(null);
export const transactionInProgress = writable(false);
export const addresses = derived(
	[network],
	([$network]) => {
		return {
			NonFungibleToken: contractData.NonFungibleToken[$network],
			MetadataViews: contractData.MetadataViews[$network],
			FungibleToken: contractData.FungibleToken[$network],
			FlowToken: contractData.FlowToken[$network],
			ECTreasury: contractData.ECTreasury[$network]
		}
	}
)

export const contractInfo = persistentWritable('contractInfo', {
	name: '',
	description: '',
	image: null,
	payment: null,
	startMinting: true
});

export const contractCode = derived(
	[contractInfo, user, addresses],
	([$contractInfo, $user]) => {
		return replaceWithProperValues(contract, $contractInfo.name.replace(/\s+/g, ''), undefined)
			.replaceAll('USER_ADDR', $user.addr);
	}
);
