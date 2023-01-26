// CREATED BY: Touchstone (https://touchstone.city/), a platform crafted by your best friends at Emerald City DAO (https://ecdao.org/).
// STATEMENT: This contract promises to keep the 5% royalty off of primary sales and 2.5% off of secondary sales to Emerald City DAO or risk permanent suspension from participation in the DAO and its tools.

import NonFungibleToken from "./utility/NonFungibleToken.cdc"
import MetadataViews from "./utility/MetadataViews.cdc" 
import FungibleToken from "./utility/FungibleToken.cdc"
import FlowToken from "./utility/FlowToken.cdc"
import MintVerifiers from "./MintVerifiers.cdc" 
import FUSD from "./utility/FUSD.cdc"
import EmeraldPass from "./utility/EmeraldPass.cdc"

pub contract ExampleNFT: NonFungibleToken {

	// Collection Information
	access(self) let collectionInfo: {String: AnyStruct}

	// Contract Information
	pub var nextEditionId: UInt64
	pub var nextMetadataId: UInt64
	pub var totalSupply: UInt64

	// Events
	pub event ContractInitialized()
	pub event Withdraw(id: UInt64, from: Address?)
	pub event Deposit(id: UInt64, to: Address?)
	pub event TouchstonePurchase(id: UInt64, recipient: Address, metadataId: UInt64, name: String, description: String, image: MetadataViews.IPFSFile, price: UFix64)
	pub event Minted(id: UInt64, recipient: Address, metadataId: UInt64)
	pub event MintBatch(metadataIds: [UInt64], recipients: [Address])

	// Paths
	pub let CollectionStoragePath: StoragePath
	pub let CollectionPublicPath: PublicPath
	pub let CollectionPrivatePath: PrivatePath
	pub let AdministratorStoragePath: StoragePath

	// Maps metadataId of NFT to Metadata
	access(account) let nftMetadatas: {UInt64: NFTMetadata}
	access(account) let packMetadatas: {UInt64: PackMetadata}
	// Maps the metadataId of an NFT to the primary buyer
	access(account) let primaryBuyers: {Address: {UInt64: [UInt64]}}
	access(account) let nftStorage: @{Address: {UInt64: NFT}}

	pub struct Metadata {
		pub let metadataId: UInt64
		pub let name: String
		pub let description: String 
		// The main image of the NFT
		pub let image: MetadataViews.IPFSFile
		// An optional thumbnail that can go along with it
		// for easier loading
		pub let thumbnail: MetadataViews.IPFSFile?
		// If price is nil, defaults to the collection price
		pub let price: UFix64?
		pub var extra: {String: AnyStruct}
		pub let supply: UInt64
		pub var numBought: UInt64
		pub let purchasers: {UInt64: Address}
		pub let lockSale: Bool

		access(account) fun purchased(serial: UInt64, buyer: Address) {
			self.purchasers[serial] = buyer
			self.numBought = self.numBought + 1
		}

		init(name: String, description: String, image: MetadataViews.IPFSFile, thumbnail: MetadataViews.IPFSFile?, price: UFix64?, extra: {String: AnyStruct}, supply: UInt64, lockSale: Bool) {
			self.metadataId = ExampleNFT.nextMetadataId
			self.name = name
			self.description = description
			self.image = image
			self.thumbnail = thumbnail
			self.price = price
			self.extra = extra
			self.supply = supply
			self.numBought = 0
			self.purchasers = {}
			self.lockSale = lockSale
		}
	}

	pub struct interface IMetadata {
		pub let metadata: Metadata
		pub let isPack: Bool
	}

	pub struct NFTMetadata: IMetadata {
		pub let metadata: Metadata
		pub let isPack: Bool

		init(metadata: Metadata) {
			self.metadata = metadata
			self.isPack = false
		}
	}

	pub struct Identifier {
		pub let metadataId: UInt64
		pub let serial: UInt64

		init(_ metadataId: UInt64, _ serial: UInt64) {
			self.metadataId = metadataId
			self.serial = serial
		}
	}

	pub struct PackMetadata: IMetadata {
		pub let metadata: Metadata
		pub let isPack: Bool
		// NFT metadataId -> serials
		pub let containedNFTs: [[Identifier]]
		pub var numOpened: UInt64

		pub fun opened() {
			self.numOpened = self.numOpened + 1
		}

		init(metadata: Metadata, containedNFTs: [[Identifier]]) {
			pre {
				UInt64(containedNFTs.length) == metadata.supply: "Must be equal number of pack infos."
			}
			self.metadata = metadata
			self.isPack = true
			self.containedNFTs = containedNFTs
			self.numOpened = 0
		}
	}

	pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
		// The 'id' is the same as the 'uuid'
		pub let id: UInt64
		// The 'metadataId' is what maps this NFT to its 'Metadata'
		pub let metadataId: UInt64
		pub let serial: UInt64

		pub fun getMetadata(): {IMetadata} {
			return ExampleNFT.getMetadata(self.metadataId)!
		}

		pub fun getViews(): [Type] {
			return [
				Type<MetadataViews.Display>(),
				Type<MetadataViews.ExternalURL>(),
				Type<MetadataViews.NFTCollectionData>(),
				Type<MetadataViews.NFTCollectionDisplay>(),
				Type<MetadataViews.Royalties>(),
				Type<MetadataViews.Serial>(),
				Type<MetadataViews.Traits>(),
				Type<MetadataViews.NFTView>()
			]
		}

		pub fun resolveView(_ view: Type): AnyStruct? {
			switch view {
				case Type<MetadataViews.Display>():
					let metadata = self.getMetadata()
					return MetadataViews.Display(
						name: metadata.metadata.name,
						description: metadata.metadata.description,
						thumbnail: metadata.metadata.thumbnail ?? metadata.metadata.image
					)
				case Type<MetadataViews.NFTCollectionData>():
					return MetadataViews.NFTCollectionData(
						storagePath: ExampleNFT.CollectionStoragePath,
						publicPath: ExampleNFT.CollectionPublicPath,
						providerPath: ExampleNFT.CollectionPrivatePath,
						publicCollection: Type<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(),
						publicLinkedType: Type<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(),
						providerLinkedType: Type<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection, NonFungibleToken.Provider}>(),
						createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
								return <- ExampleNFT.createEmptyCollection()
						})
					)
				case Type<MetadataViews.ExternalURL>():
          return MetadataViews.ExternalURL("https://touchstone.city/discover/".concat(self.owner!.address.toString()).concat("/ExampleNFT"))
				case Type<MetadataViews.NFTCollectionDisplay>():
					let squareMedia = MetadataViews.Media(
						file: ExampleNFT.getCollectionAttribute(key: "image") as! MetadataViews.IPFSFile,
						mediaType: "image"
					)

					// If a banner image exists, use it
					// Otherwise, default to the main square image
					var bannerMedia: MetadataViews.Media? = nil
					if let bannerImage = ExampleNFT.getOptionalCollectionAttribute(key: "bannerImage") as! MetadataViews.IPFSFile? {
						bannerMedia = MetadataViews.Media(
							file: bannerImage,
							mediaType: "image"
						)
					}
					return MetadataViews.NFTCollectionDisplay(
						name: ExampleNFT.getCollectionAttribute(key: "name") as! String,
						description: ExampleNFT.getCollectionAttribute(key: "description") as! String,
						externalURL: MetadataViews.ExternalURL("https://touchstone.city/discover/".concat(self.owner!.address.toString()).concat("/ExampleNFT")),
						squareImage: squareMedia,
						bannerImage: bannerMedia ?? squareMedia,
						socials: ExampleNFT.getCollectionAttribute(key: "socials") as! {String: MetadataViews.ExternalURL}
					)
				case Type<MetadataViews.Royalties>():
					return MetadataViews.Royalties([
						// This is for Emerald City in favor of producing Touchstone, a free platform for our users. Failure to keep this in the contract may result in permanent suspension from Emerald City.
						MetadataViews.Royalty(
							recepient: getAccount(0x5643fd47a29770e7).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
							cut: 0.025, // 2.5% royalty on secondary sales
							description: "Emerald City DAO receives a 2.5% royalty from secondary sales because this collection was created using Touchstone (https://touchstone.city/), a tool for creating your own NFT collections, crafted by Emerald City DAO."
						)
					])
				case Type<MetadataViews.Serial>():
					return MetadataViews.Serial(
						self.serial
					)
				case Type<MetadataViews.Traits>():
					return MetadataViews.dictToTraits(dict: self.getMetadata().metadata.extra, excludedNames: nil)
				case Type<MetadataViews.NFTView>():
					return MetadataViews.NFTView(
						id: self.id,
						uuid: self.uuid,
						display: self.resolveView(Type<MetadataViews.Display>()) as! MetadataViews.Display?,
						externalURL: self.resolveView(Type<MetadataViews.ExternalURL>()) as! MetadataViews.ExternalURL?,
						collectionData: self.resolveView(Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?,
						collectionDisplay: self.resolveView(Type<MetadataViews.NFTCollectionDisplay>()) as! MetadataViews.NFTCollectionDisplay?,
						royalties: self.resolveView(Type<MetadataViews.Royalties>()) as! MetadataViews.Royalties?,
						traits: self.resolveView(Type<MetadataViews.Traits>()) as! MetadataViews.Traits?
					)
			}
			return nil
		}

		init(metadataId: UInt64, serial: UInt64, recipient: Address) {
			self.id = self.uuid
			self.metadataId = metadataId
			self.serial = serial

			// Update the buyers list so we keep track of who is purchasing
			if let buyersRef = &ExampleNFT.primaryBuyers[recipient] as &{UInt64: [UInt64]}? {
				if let metadataIdMap = &buyersRef[metadataId] as &[UInt64]? {
					metadataIdMap.append(serial)
				} else {
					buyersRef[metadataId] = [serial]
				}
			} else {
				ExampleNFT.primaryBuyers[recipient] = {metadataId: [serial]}
			}
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

		pub fun openPack(id: UInt64) {
			let pack <- self.withdraw(withdrawID: id) as! @NFT
			assert(pack.getMetadata().isPack, message: "This is not a pack!")
			let packMetadata: &PackMetadata = (&ExampleNFT.packMetadatas[pack.metadataId] as &PackMetadata?)!
			let containedNFTs: [Identifier] = packMetadata.containedNFTs[packMetadata.numOpened]
			for identifier in containedNFTs {
				self.deposit(token: <- ExampleNFT.createNFT(metadataId: identifier.metadataId, serial: identifier.serial, recipient: self.owner!.address))
			}
			packMetadata.opened()
			destroy pack
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

		pub fun claim() {
			if let storage = &ExampleNFT.nftStorage[self.owner!.address] as &{UInt64: NFT}? {
				for id in storage.keys {
					self.deposit(token: <- storage.remove(key: id)!)
				}
			}
		}

		init () {
			self.ownedNFTs <- {}
		}

		destroy() {
			destroy self.ownedNFTs
		}
	}

	access(self) fun mint(metadataId: UInt64, recipient: &{NonFungibleToken.Receiver}, payment: @FungibleToken.Vault, nft: @NFT) {
		pre {
			self.canMint(): "Minting is currently closed by the Administrator!"
		}
		let price: UFix64 = self.getPriceOfItem(metadataId)!
		assert(payment.balance == price, message: "Payment does not match the price. You passed in ".concat(payment.balance.toString()).concat(" but this NFT costs ").concat(self.getPriceOfItem(metadataId)!.toString()))
		// Confirm recipient passes all verifiers
		for verifier in self.getMintVerifiers() {
			let params = {"minter": recipient.owner!.address}
			if let error = verifier.verify(params) {
				panic(error)
			}
		}

		// Handle Emerald City DAO royalty (5%)
		let EmeraldCityTreasury = getAccount(0x5643fd47a29770e7).getCapability(/public/RECEIVERPATH)
								.borrow<&FungibleToken.Vault{FungibleToken.Receiver}>()!
		let emeraldCityCut: UFix64 = 0.05 * price

		// Handle royalty to user that was configured upon creation
		if let royalty = ExampleNFT.getOptionalCollectionAttribute(key: "royalty") as! MetadataViews.Royalty? {
			royalty.receiver.borrow()!.deposit(from: <- payment.withdraw(amount: price * royalty.cut))
		}

		EmeraldCityTreasury.deposit(from: <- payment.withdraw(amount: emeraldCityCut))

		// Give the rest to the collection owner
		let paymentRecipient = self.account.getCapability(/public/RECEIVERPATH)
								.borrow<&FungibleToken.Vault{FungibleToken.Receiver}>()!
		paymentRecipient.deposit(from: <- payment)

		self.collectionInfo["profit"] = (self.getCollectionAttribute(key: "profit") as! UFix64) + price
		let metadata = self.getMetadata(metadataId)!.metadata

		// Emit event
		emit TouchstonePurchase(id: nft.id, recipient: recipient.owner!.address, metadataId: metadataId, name: metadata.name, description: metadata.description, image: metadata.image, price: price)
		// Deposit nft
		recipient.deposit(token: <- nft)
	}

	// A function to mint NFTs. 
	// You can only call this function if minting
	// is currently active.
	pub fun mintNFT(metadataId: UInt64, recipient: &{NonFungibleToken.Receiver}, payment: @FungibleToken.Vault, serial: UInt64): UInt64 {
		pre {
			!self.getNFTMetadata(metadataId)!.metadata.lockSale: "This NFT can only be discovered in Packs."
		}
		// Mint the nft 
		let nft <- self.createNFT(metadataId: metadataId, serial: serial, recipient: recipient.owner!.address)
		let id = nft.id
		self.mint(metadataId: metadataId, recipient: recipient, payment: <- payment, nft: <- nft)
		return id
	}

	// A function to mint Packs. 
	// You can only call this function if minting
	// is currently active.
	pub fun mintPack(metadataId: UInt64, recipient: &{NonFungibleToken.Receiver}, payment: @FungibleToken.Vault): UInt64 {
		// Mint the nft 
		let pack <- self.createPack(metadataId: metadataId, recipient: recipient.owner!.address)
		let id = pack.id
		self.mint(metadataId: metadataId, recipient: recipient, payment: <- payment, nft: <- pack)
		return id
	}

	pub resource Administrator {
		pub fun createNFTMetadata(metadata: Metadata) {
			ExampleNFT.nftMetadatas[ExampleNFT.nextMetadataId] = NFTMetadata(metadata: metadata)
			ExampleNFT.nextMetadataId = ExampleNFT.nextMetadataId + 1
		}

		pub fun createPackMetadata(metadata: Metadata, containedNFTs: [[Identifier]]) {
			ExampleNFT.packMetadatas[ExampleNFT.nextMetadataId] = PackMetadata(metadata: metadata, containedNFTs: containedNFTs)
			ExampleNFT.nextMetadataId = ExampleNFT.nextMetadataId + 1
		}

		// mintItem mints a new NFT or Pack and deposits 
		// it in the recipients collection
		pub fun mintItem(metadataId: UInt64, serial: UInt64, recipient: Address) {
			pre {
				EmeraldPass.isActive(user: ExampleNFT.account.address): "You must have an active Emerald Pass subscription to airdrop NFTs. You can purchase Emerald Pass at https://pass.ecdao.org/"
			}
			var nft: @NFT? <- nil
			if ExampleNFT.isPack(metadataId) {
				nft <-! ExampleNFT.createPack(metadataId: metadataId, recipient: recipient)
			} else if ExampleNFT.isNFT(metadataId) {
				nft <-! ExampleNFT.createNFT(metadataId: metadataId, serial: serial, recipient: recipient)
			} else {
				panic("Not a valiid NFT or Pack metadataId")
			}
			
			if let recipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath).borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>() {
				recipientCollection.deposit(token: <- nft!)
			} else {
				if let storage = &ExampleNFT.nftStorage[recipient] as &{UInt64: NFT}? {
					storage[nft?.id!] <-! nft
				} else {
					ExampleNFT.nftStorage[recipient] <-! {nft?.id!: <- nft!}
				}
			}
		}

		pub fun mintBatch(metadataIds: [UInt64], serials: [UInt64], recipients: [Address]) {
			pre {
				metadataIds.length == recipients.length: "You need to pass in an equal number of metadataIds and recipients."
			}
			var i = 0
			while i < metadataIds.length {
				self.mintItem(metadataId: metadataIds[i], serial: serials[i], recipient: recipients[i])
				i = i + 1
			}

			emit MintBatch(metadataIds: metadataIds, recipients: recipients)
		}

		// create a new Administrator resource
		pub fun createAdmin(): @Administrator {
			return <- create Administrator()
		}

		// change piece of collection info
		pub fun changeField(key: String, value: AnyStruct) {
			ExampleNFT.collectionInfo[key] = value
		}
	}

	// public function that anyone can call to create a new empty collection
	pub fun createEmptyCollection(): @NonFungibleToken.Collection {
		return <- create Collection()
	}

	pub fun isPack(_ metadataId: UInt64): Bool {
		return self.packMetadatas[metadataId] != nil
	}

	pub fun isNFT(_ metadataId: UInt64): Bool {
		return self.nftMetadatas[metadataId] != nil
	}

	// Get information about a Metadata
	pub fun getMetadata(_ metadataId: UInt64): {IMetadata}? {
		if self.isPack(metadataId) {
			return self.getPackMetadata(metadataId)
		} else if self.isNFT(metadataId) {
			return self.getNFTMetadata(metadataId)
		}
		return nil
	}

	pub fun getNFTMetadata(_ metadataId: UInt64): NFTMetadata? {
		return self.nftMetadatas[metadataId]
	}

	pub fun getPackMetadata(_ metadataId: UInt64): PackMetadata? {
		return self.packMetadatas[metadataId]
	}

	pub fun getNFTMetadatas(): {UInt64: NFTMetadata} {
		return self.nftMetadatas
	}

	pub fun getPackMetadatas(): {UInt64: PackMetadata} {
		return self.packMetadatas
	}

	pub fun getPrimaryBuyers(): {Address: {UInt64: [UInt64]}} {
		return self.primaryBuyers
	}

	pub fun getCollectionInfo(): {String: AnyStruct} {
		let collectionInfo = self.collectionInfo
		collectionInfo["nftMetadatas"] = self.nftMetadatas
		collectionInfo["packMetadatas"] = self.packMetadatas
		collectionInfo["primaryBuyers"] = self.primaryBuyers
		collectionInfo["totalSupply"] = self.totalSupply
		collectionInfo["nextMetadataId"] = self.nextMetadataId
		collectionInfo["version"] = 1
		return collectionInfo
	}

	pub fun getCollectionAttribute(key: String): AnyStruct {
		return self.collectionInfo[key] ?? panic(key.concat(" is not an attribute in this collection."))
	}

	pub fun getOptionalCollectionAttribute(key: String): AnyStruct? {
		return self.collectionInfo[key]
	}

	pub fun getMintVerifiers(): [{MintVerifiers.IVerifier}] {
		return self.getCollectionAttribute(key: "mintVerifiers") as! [{MintVerifiers.IVerifier}]
	}

	pub fun canMint(): Bool {
		return self.getCollectionAttribute(key: "minting") as! Bool
	}

	// Returns nil if an NFT with this metadataId doesn't exist
	pub fun getPriceOfItem(_ metadataId: UInt64): UFix64? {
		if let metadata: {IMetadata} = self.getMetadata(metadataId) {
			let defaultPrice: UFix64 = self.getCollectionAttribute(key: "price") as! UFix64
			return metadata.metadata.price ?? defaultPrice
		}
		// If the metadataId doesn't exist
		return nil
	}

	// Returns an mapping of `id` to Metadata
	// for the NFTs a user can claim
	pub fun getClaimableNFTs(user: Address): {UInt64: Metadata} {
		let answer: {UInt64: Metadata} = {}
		if let storage = &ExampleNFT.nftStorage[user] as &{UInt64: NFT}? {
			for id in storage.keys {
				let nftRef = (&storage[id] as &NFT?)!
				answer[id] = self.getNFTMetadata(nftRef.metadataId)!.metadata
			}
		}
		return answer
	}

	// Helpers

	access(self) fun createNFT(metadataId: UInt64, serial: UInt64, recipient: Address): @NFT {
			pre {
				ExampleNFT.nftMetadatas[metadataId] != nil:
					"This NFT does not exist yet."
				serial < ExampleNFT.getNFTMetadata(metadataId)!.metadata.supply:
					"This serial does not exist for this metadataId."
				!ExampleNFT.getNFTMetadata(metadataId)!.metadata.purchasers.containsKey(serial):
					"This serial has already been purchased."
			}

			// Update who bought this serial inside Metadata so it cannot be purchased again.
			let metadataRef: &NFTMetadata = (&ExampleNFT.nftMetadatas[metadataId] as &NFTMetadata?)!
			metadataRef.metadata.purchased(serial: serial, buyer: recipient)

			ExampleNFT.totalSupply = ExampleNFT.totalSupply + 1
			let nft: @NFT <- create NFT(metadataId: metadataId, serial: serial, recipient: recipient)
			emit Minted(id: nft.id, recipient: recipient, metadataId: metadataId)
			return <- nft
	}

	access(self) fun createPack(metadataId: UInt64, recipient: Address): @NFT {
			pre {
				ExampleNFT.packMetadatas[metadataId] != nil:
					"This Pack does not exist yet."
			}

			// Update who bought this serial inside Metadata so it cannot be purchased again.
			let metadataRef: &PackMetadata = (&ExampleNFT.packMetadatas[metadataId] as &PackMetadata?)!
			let serial = UInt64(metadataRef.metadata.numBought)
			metadataRef.metadata.purchased(serial: serial, buyer: recipient)

			let pack: @NFT <- create NFT(metadataId: metadataId, serial: serial, recipient: recipient)
			emit Minted(id: pack.id, recipient: recipient, metadataId: metadataId)
			return <- pack
	}

	init(
		name: String, 
		description: String, 
		imagePath: String, 
		bannerImagePath: String?,
		minting: Bool, 
		royalty: MetadataViews.Royalty?,
		defaultPrice: UFix64,
		paymentType: String,
		ipfsCID: String,
		socials: {String: MetadataViews.ExternalURL},
		mintVerifiers: [{MintVerifiers.IVerifier}]
	) {
		// Collection Info
		self.collectionInfo = {}
		self.collectionInfo["name"] = name
		self.collectionInfo["description"] = description
		self.collectionInfo["image"] = MetadataViews.IPFSFile(
			cid: ipfsCID,
			path: imagePath
		)
		if let bannerImagePath = bannerImagePath {
			self.collectionInfo["bannerImage"] = MetadataViews.IPFSFile(
				cid: ipfsCID,
				path: bannerImagePath
			)
		}
		self.collectionInfo["ipfsCID"] = ipfsCID
		self.collectionInfo["socials"] = socials
		self.collectionInfo["minting"] = minting
		if let royalty = royalty {
			assert(royalty.receiver.check(), message: "The passed in royalty receiver is not valid. The royalty account must set up the intended payment token.")
			assert(royalty.cut <= 0.95, message: "The royalty cut cannot be bigger than 95% because 5% goes to Emerald City treasury for primary sales.")
			self.collectionInfo["royalty"] = royalty
		}
		self.collectionInfo["price"] = defaultPrice
		self.collectionInfo["paymentType"] = paymentType
		self.collectionInfo["dateCreated"] = getCurrentBlock().timestamp
		self.collectionInfo["mintVerifiers"] = mintVerifiers
		self.collectionInfo["profit"] = 0.0

		self.nextEditionId = 0
		self.nextMetadataId = 0
		self.totalSupply = 0
		self.nftMetadatas = {}
		self.packMetadatas = {}
		self.primaryBuyers = {}
		self.nftStorage <- {}

		// Set the named paths
		// We include the user's address in the paths.
		// This is to prevent clashing with existing 
		// Collection paths in the ecosystem.
		self.CollectionStoragePath = /storage/ExampleNFTCollectionUSERADDR
		self.CollectionPublicPath = /public/ExampleNFTCollectionUSERADDR
		self.CollectionPrivatePath = /private/ExampleNFTCollectionUSERADDR
		self.AdministratorStoragePath = /storage/ExampleNFTAdministratorUSERADDR

		// Create a Collection resource and save it to storage
		let collection <- create Collection()
		self.account.save(<- collection, to: self.CollectionStoragePath)

		// create a public capability for the collection
		self.account.link<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(
			self.CollectionPublicPath,
			target: self.CollectionStoragePath
		)

		// Create a Administrator resource and save it to storage
		let administrator <- create Administrator()
		self.account.save(<- administrator, to: self.AdministratorStoragePath)

		emit ContractInitialized()
	}
}
 