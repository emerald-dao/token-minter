import { writable, get, derived } from 'svelte/store';

const EMULATOR_ADDR = '0xf8d6e0586b0a20c7';
const NONFUNGIBLETOKEN_ADDR = '0x631e88ae7f1d7c20';
const FLOWTOKEN_ADDR = '0x7e60df042a9c0868';
const FUNGIBLETOKEN_ADDR = '0x9a0766d93b6608b7';

export const user = writable(null);
export const profile = writable(null);
export const transactionStatus = writable(null);
export const transactionInProgress = writable(false);

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
	([$contractInfo, $user]) => `
// CREATED BY: Touchstone (https://touchstone.city/), a platform crafted by your best friends at Emerald City DAO (https://ecdao.org/).

import NonFungibleToken from ${NONFUNGIBLETOKEN_ADDR}
import MetadataViews from ${NONFUNGIBLETOKEN_ADDR}
import FungibleToken from ${FUNGIBLETOKEN_ADDR}
import FlowToken from ${FLOWTOKEN_ADDR}

pub contract ${$contractInfo.name}: NonFungibleToken {

	// Collection Info
	pub var name: String
	pub var description: String
	pub var image: String
	pub var ipfsCID: String
	pub var price: UFix64

	// Contract Info
	pub var nextMetadataId: UInt64
	pub var totalSupply: UInt64
	pub var minting: Bool

	pub event ContractInitialized()
	pub event Withdraw(id: UInt64, from: Address?)
	pub event Deposit(id: UInt64, to: Address?)

	pub let CollectionStoragePath: StoragePath
	pub let CollectionPublicPath: PublicPath
	pub let AdministratorStoragePath: StoragePath

	// maps serial of NFT to NFTMetadata
	access(account) var unpurchasedNFTs: {UInt64: NFTMetadata}
	// maps the serial of an NFT to the primary buyer
	access(account) var primaryBuyers: {UInt64: Address}

	pub struct NFTMetadata {
		pub let metadataId: UInt64
		pub let name: String
		pub let description: String
		pub let thumbnailPath: String
		pub var extra: {String: String}

		init(_name: String, _description: String, _thumbnailPath: String, _extra: {String: String}) {
			self.metadataId = ${$contractInfo.name}.nextMetadataId
			self.name = _name
			self.description = _description
			self.thumbnailPath = _thumbnailPath
			self.extra = _extra

			${$contractInfo.name}.nextMetadataId = ${$contractInfo.name}.nextMetadataId + 1
		}
	}

	pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
		// The 'id' is the same as the 'uuid'
		pub let id: UInt64
		// The 'serial' is what maps this NFT to its 'NFTMetadata'
		pub let serial: UInt64
		// Contains all the metadata of the NFT
		pub let metadata: NFTMetadata

		pub fun getViews(): [Type] {
				return [
						Type<MetadataViews.Display>()
				]
		}

		pub fun resolveView(_ view: Type): AnyStruct? {
			switch view {
				case Type<MetadataViews.Display>():
					return MetadataViews.Display(
						name: self.metadata.name,
						description: self.metadata.description,
						thumbnail: MetadataViews.IPFSFile(
							cid: ${$contractInfo.name}.ipfsCID,
							path: self.metadata.thumbnailPath
						)
					)
			}
			return nil
		}

		init() {
			self.id = self.uuid
			self.serial = ${$contractInfo.name}.totalSupply
			self.metadata = ${$contractInfo.name}.unpurchasedNFTs.remove(key: self.serial) ?? panic("There does not exist a NFTMetadata for this NFT.")

			${$contractInfo.name}.totalSupply = ${$contractInfo.name}.totalSupply + 1
		}
	}

	pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
		// dictionary of NFT conforming tokens
		// NFT is a resource type with an 'UInt64' ID field
		pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

		// withdraw removes an NFT from the collection and moves it to the caller
		pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
			let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

			emit Withdraw(id: token.id, from: self.owner?.address)

			return <-token
		}

		// deposit takes a NFT and adds it to the collections dictionary
		// and adds the ID to the id array
		pub fun deposit(token: @NonFungibleToken.NFT) {
			let token <- token as! @NFT

			let id: UInt64 = token.id

			// add the new token to the dictionary
			self.ownedNFTs[id] <-! token

			emit Deposit(id: id, to: self.owner?.address)
		}

		// getIDs returns an array of the IDs that are in the collection
		pub fun getIDs(): [UInt64] {
			return self.ownedNFTs.keys
		}

		// borrowNFT gets a reference to an NFT in the collection
		// so that the caller can read its metadata and call its methods
		pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
			return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
		}

		pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
			let token = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
			let nft = token as! &NFT
			return nft as &AnyResource{MetadataViews.Resolver}
		}

		init () {
			self.ownedNFTs <- {}
		}

		destroy() {
			destroy self.ownedNFTs
		}
	}

	// purchaseNFT purchases a new NFT and deposits 
	// it in the recipients collection
	pub fun purchaseNFT(
		recipient: &{NonFungibleToken.CollectionPublic},
		payment: @FlowToken.Vault
	) {
		pre {
			self.minting: "Minting is currently closed by the Administrator!"
			payment.balance == self.price: "You did not pass in the correct amount of FlowToken."
		}

		let paymentRecipient = self.account.getCapability(/public/flowTokenReceiver)
									.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
		paymentRecipient.deposit(from: <- payment)

		self.mintNFT(recipient: recipient)
	}

	pub fun freeNFT(recipient: &{NonFungibleToken.CollectionPublic}) {
		pre {
			self.minting: "Minting is currently closed by the Administrator!"
			self.price == 0.0: "You must call the purchaseNFT function instead."
		}
		self.mintNFT(recipient: recipient)
	}

	access(contract) fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}) {
		let nft <- create NFT()
		self.primaryBuyers[nft.serial] = recipient.owner!.address
		recipient.deposit(token: <- nft)
	}

	pub resource Administrator {
		pub fun createNFTMetadata(name: String, description: String, thumbnailPath: String, extra: {String: String}) {
			${$contractInfo.name}.unpurchasedNFTs[${$contractInfo.name}.nextMetadataId] = NFTMetadata(
				_name: name,
				_description: description,
				_thumbnailPath: thumbnailPath,
				_extra: extra
			)
		}

		// mintNFT mints a new NFT and deposits 
		// it in the recipients collection
		pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}) {
			${$contractInfo.name}.mintNFT(recipient: recipient)
		}

		// turn minting on/off
		pub fun toggleMinting(): Bool {
			${$contractInfo.name}.minting = !${$contractInfo.name}.minting
			return ${$contractInfo.name}.minting
		}

		// create a new Administrator resource
		pub fun createAdmin(): @Administrator {
			return <- create Administrator()
		}

		pub fun changePrice(newPrice: UFix64) {
			${$contractInfo.name}.price = newPrice
		}

		pub fun changeName(newName: String) {
			${$contractInfo.name}.name = newName
		}

		pub fun changeDescription(newDescription: String) {
			${$contractInfo.name}.description = newDescription
		}

		pub fun changeImage(newImage: String) {
			${$contractInfo.name}.image = newImage
		}
	}

	// public function that anyone can call to create a new empty collection
	pub fun createEmptyCollection(): @NonFungibleToken.Collection {
		return <- create Collection()
	}

	// Get information about a NFTMetadata
	pub fun getUnpurchasedNFT(_ serial: UInt64): NFTMetadata? {
		return self.unpurchasedNFTs[serial]
	}

	pub fun getUnpurchasedNFTs(): {UInt64: NFTMetadata} {
		return self.unpurchasedNFTs
	}

	pub fun getPrimaryBuyers(): {UInt64: Address} {
		return self.primaryBuyers
	}

	init(
		_name: String, 
		_description: String, 
		_image: String, 
		_minting: Bool, 
		_price: UFix64,
		_ipfsCID: String
	) {
		// Collection Info
		self.name = _name
		self.description = _description
		self.image = _image
		self.ipfsCID = _ipfsCID

		// Initialize default info
		self.minting = _minting
		self.price = _price

		self.nextMetadataId = 0
		self.totalSupply = 0
		self.unpurchasedNFTs = {}
		self.primaryBuyers = {}

		// Set the named paths
		self.CollectionStoragePath = /storage/${$contractInfo.name}Collection${$user?.addr}
		self.CollectionPublicPath = /public/${$contractInfo.name}Collection${$user?.addr}
		self.AdministratorStoragePath = /storage/${$contractInfo.name}Administrator${$user?.addr}

		// Create a Collection resource and save it to storage
		let collection <- create Collection()
		self.account.save(<- collection, to: self.CollectionStoragePath)

		// create a public capability for the collection
		self.account.link<&Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(
			self.CollectionPublicPath,
			target: self.CollectionStoragePath
		)

		// Create a Administrator resource and save it to storage
		let administrator <- create Administrator()
		self.account.save(<- administrator, to: self.AdministratorStoragePath)

		emit ContractInitialized()
	}
}
`
);
