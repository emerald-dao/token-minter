import { writable, get, derived } from 'svelte/store';
import contract from './cadence/ExampleNFT.cdc?raw';

const EMULATOR_ADDR = '0xf8d6e0586b0a20c7';
const NONFUNGIBLETOKEN_ADDR = '0x631e88ae7f1d7c20';
const FLOWTOKEN_ADDR = '0x7e60df042a9c0868';
const FUNGIBLETOKEN_ADDR = '0x9a0766d93b6608b7';

export const user = writable(null);
export const profile = writable(null);
export const transactionStatus = writable(null);
export const transactionInProgress = writable(false);
export const uploadingStatus = writable(null);
export const uploadingInProgress = writable(false);

export const contractInfo = writable({
	name: 'ExampleNFT',
	description: 'This is an example NFT Collection.',
	imageHash: '',
	maxSupply: null,
	payment: null,
	startMinting: true,
	ipfsHash: ''
});

export const contractCode = derived(
	[contractInfo, user],
	([$contractInfo, $user]) => {
		return contract
			.replaceAll('ExampleNFT', $contractInfo.name.replace(/\s+/g, ''))
			.replace('"./utility/NonFungibleToken.cdc"', NONFUNGIBLETOKEN_ADDR)
			.replace('"./utility/MetadataViews.cdc"', NONFUNGIBLETOKEN_ADDR)
			.replace('"./utility/FungibleToken.cdc"', FUNGIBLETOKEN_ADDR)
			.replace('"./utility/FlowToken.cdc"', FLOWTOKEN_ADDR);
	}
);
