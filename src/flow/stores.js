import { persistentWritable } from '$lib/stores/ThemeStore';
import { writable, get, derived } from 'svelte/store';
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
}

const network = 'testnet';
export const EMULATOR_ADDR = '0xf8d6e0586b0a20c7';
export const NONFUNGIBLETOKEN_ADDR = contractData.NonFungibleToken[network];
export const METADATAVIEWS_ADDR = contractData.MetadataViews[network];
export const FLOWTOKEN_ADDR = contractData.FlowToken[network];
export const FUNGIBLETOKEN_ADDR = contractData.FungibleToken[network];

export const user = writable(null);
export const profile = writable(null);
export const transactionStatus = writable(null);
export const transactionInProgress = writable(false);

export const contractInfo = persistentWritable('contractInfo', {
	name: '',
	description: '',
	image: null,
	maxSupply: null,
	payment: null,
	startMinting: true,
	ipfsHash: '',
});

export const contractCode = derived(
	[contractInfo, user],
	([$contractInfo, $user]) => {
		return contract
			.replaceAll('ExampleNFT', $contractInfo.name.replace(/\s+/g, ''))
			.replaceAll('USER_ADDR', $user.addr)
			.replace('"./utility/NonFungibleToken.cdc"', NONFUNGIBLETOKEN_ADDR)
			.replace('"./utility/MetadataViews.cdc"', METADATAVIEWS_ADDR)
			.replace('"./utility/FungibleToken.cdc"', FUNGIBLETOKEN_ADDR)
			.replace('"./utility/FlowToken.cdc"', FLOWTOKEN_ADDR);
	}
);
