// CREATED BY: Touchstone (https://touchstone.city/), a platform crafted by your best friends at Emerald City DAO (https://ecdao.org/).
// STATEMENT: This contract promises to keep the 5% royalty off of primary sales to Emerald City DAO or risk permanent suspension from participation in the DAO and its tools.

import NonFungibleToken from "./utility/NonFungibleToken.cdc"
import MetadataViews from "./utility/MetadataViews.cdc" 
import FungibleToken from "./utility/FungibleToken.cdc"
import FlowToken from "./utility/FlowToken.cdc"
import MintVerifiers from "./MintVerifiers.cdc" 

pub contract ExampleNFT: NonFungibleToken {

	// Collection Information
	access(self) let collectionInfo: {String: AnyStruct}

	// Contract Information
	pub var nextMetadataId: UInt64
	pub var totalSupply: UInt64

	// Events
	pub event ContractInitialized()
	pub event Withdraw(id: UInt64, from: Address?)
	pub event Deposit(id: UInt64, to: Address?)
	pub event TouchstonePurchase(id: UInt64, recipient: Address, metadataId: UInt64, name: String, description: String, thumbnail: MetadataViews.IPFSFile)
	pub event Minted(id: UInt64, recipient: Address, metadataId: UInt64)
	pub event MintBatch(metadataIds: [UInt64], intendedRecipients: [Address], notSetup: [Address])

	// Paths
	pub let CollectionStoragePath: StoragePath
	pub let CollectionPublicPath: PublicPath
	pub let CollectionPrivatePath: PrivatePath
	pub let AdministratorStoragePath: StoragePath

	// Maps metadataId of NFT to NFTMetadata
	access(account) let metadatas: {UInt64: NFTMetadata}

	// Maps the metadataId of an NFT to the primary buyer
	//
	// You can also get a list of purchased NFTs
	// by doing `primaryBuyers.keys`
	access(account) let primaryBuyers: {UInt64: Address}

	pub struct NFTMetadata {
		pub let metadataId: UInt64
		pub let name: String
		pub let description: String 
		pub let thumbnail: MetadataViews.IPFSFile
		// If price is nil, defaults to the collection price
		pub let price: UFix64
		pub var extra: {String: AnyStruct}

		init(_name: String, _description: String, _thumbnail: MetadataViews.IPFSFile, _price: UFix64?, _extra: {String: AnyStruct}) {
			self.metadataId = ExampleNFT.nextMetadataId
			self.name = _name
			self.description = _description
			self.thumbnail = _thumbnail
			self.price = _price ?? ExampleNFT.getCollectionAttribute(key: "price") as! UFix64
			self.extra = _extra

			ExampleNFT.nextMetadataId = ExampleNFT.nextMetadataId + 1
		}
	}

	pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
		// The 'id' is the same as the 'uuid'
		pub let id: UInt64
		// The 'metadataId' is what maps this NFT to its 'NFTMetadata'
		pub let metadataId: UInt64

		pub fun getMetadata(): NFTMetadata {
			return ExampleNFT.getNFTMetadata(self.metadataId)!
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
						name: metadata.name,
						description: metadata.description,
						thumbnail: metadata.thumbnail
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
          return MetadataViews.ExternalURL("https://touchstone.city/".concat(self.owner!.address.toString()).concat("/ExampleNFT"))
				case Type<MetadataViews.NFTCollectionDisplay>():
					let squareMedia = MetadataViews.Media(
						file: ExampleNFT.getCollectionAttribute(key: "image") as! MetadataViews.IPFSFile,
						mediaType: "image"
					)
					let bannerMedia = MetadataViews.Media(
						file: ExampleNFT.getCollectionAttribute(key: "bannerImage") as! MetadataViews.IPFSFile,
						mediaType: "image"
					)
					return MetadataViews.NFTCollectionDisplay(
						name: ExampleNFT.getCollectionAttribute(key: "name") as! String,
						description: ExampleNFT.getCollectionAttribute(key: "description") as! String,
						externalURL: MetadataViews.ExternalURL("https://touchstone.city/".concat(self.owner!.address.toString()).concat("/ExampleNFT")),
						squareImage: squareMedia,
						bannerImage: bannerMedia,
						socials: ExampleNFT.getCollectionAttribute(key: "socials") as! {String: MetadataViews.ExternalURL}
					)
				case Type<MetadataViews.Royalties>():
					return MetadataViews.Royalties([
						// This is for Emerald City in favor of producing Touchstone, a free platform for our users. Failure to keep this in the contract may result in permanent suspension from Emerald City.
						MetadataViews.Royalty(
							recepient: getAccount(0x5643fd47a29770e7).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
							cut: 0.025, // 2.5% royalty on secondary sales
							description: "Emerald City DAO receives a 2.5% royalty from secondary sales because this collection was created using Touchstone (https://touchstone.city/), a tool for NFTs created by Emerald City DAO."
						)
					])
				case Type<MetadataViews.Serial>():
					return MetadataViews.Serial(
						self.metadataId
					)
				case Type<MetadataViews.Traits>():
					return MetadataViews.dictToTraits(dict: self.getMetadata().extra, excludedNames: nil)
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

		init(_metadataId: UInt64, _recipient: Address) {
			pre {
				ExampleNFT.metadatas[_metadataId] != nil:
					"This NFT does not exist yet."
				!ExampleNFT.primaryBuyers.containsKey(_metadataId):
					"This NFT has already been minted."
			}
			self.id = self.uuid
			self.metadataId = _metadataId

			ExampleNFT.primaryBuyers[_metadataId] = _recipient
			ExampleNFT.totalSupply = ExampleNFT.totalSupply + 1

			emit Minted(id: self.id, recipient: _recipient, metadataId: _metadataId)
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

	// A function to mint NFTs. 
	// You can only call this function if minting
	// is currently active.
	pub fun mintNFT(metadataId: UInt64, recipient: &{NonFungibleToken.Receiver}, payment: @FlowToken.Vault) {
		pre {
			self.canMint(): "Minting is currently closed by the Administrator!"
			payment.balance == self.getPriceOfNFT(metadataId): 
				"Payment does not match the price. You passed in ".concat(payment.balance.toString()).concat(" but this NFT costs ").concat(self.getPriceOfNFT(metadataId)!.toString())
		}

		// Confirm recipient passes all verifiers
		for verifier in self.getMintVerifiers() {
			let params = {"minter": recipient.owner!.address}
			if let error = verifier.verify(params) {
				panic(error)
			}
		}

		// Handle Emerald City DAO royalty (5%)
		let EmeraldCityTreasury = getAccount(0x5643fd47a29770e7).getCapability(/public/flowTokenReceiver)
								.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
		let emeraldCityCut: UFix64 = 0.05 * payment.balance

		// Handle royalty to user that was configured upon creation
		if let royalty = ExampleNFT.getOptionalCollectionAttribute(key: "royalty") as! MetadataViews.Royalty? {
			royalty.receiver.borrow()!.deposit(from: <- payment.withdraw(amount: payment.balance * royalty.cut))
		}

		EmeraldCityTreasury.deposit(from: <- payment.withdraw(amount: emeraldCityCut))

		// Give the rest to the collection owner
		let paymentRecipient = self.account.getCapability(/public/flowTokenReceiver)
								.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
		paymentRecipient.deposit(from: <- payment)

		// Mint the nft 
		let nft <- create NFT(_metadataId: metadataId, _recipient: recipient.owner!.address)
		let metadata = self.getNFTMetadata(metadataId)!
		// Emit event
		emit TouchstonePurchase(id: nft.id, recipient: recipient.owner!.address, metadataId: metadataId, name: metadata.name, description: metadata.description, thumbnail: metadata.thumbnail)
		
		// Deposit nft
		recipient.deposit(token: <- nft)

		self.collectionInfo["profit"] = (self.getCollectionAttribute(key: "profit") as! UFix64) + metadata.price
	}

	pub resource Administrator {
		pub fun createNFTMetadata(name: String, description: String, thumbnailPath: String, ipfsCID: String, price: UFix64?, extra: {String: AnyStruct}) {
			ExampleNFT.metadatas[ExampleNFT.nextMetadataId] = NFTMetadata(
				_name: name,
				_description: description,
				_thumbnail: MetadataViews.IPFSFile(
					cid: ipfsCID,
					path: thumbnailPath
				),
				_price: price,
				_extra: extra
			)
		}

		// mintNFT mints a new NFT and deposits 
		// it in the recipients collection
		pub fun mintNFT(metadataId: UInt64, recipient: &{NonFungibleToken.CollectionPublic}) {
			recipient.deposit(token: <- create NFT(_metadataId: metadataId, _recipient: recipient.owner!.address))
		}

		pub fun mintBatch(metadataIds: [UInt64], recipients: [Address]) {
			pre {
				metadataIds.length == recipients.length: "You need to pass in an equal number of metadataIds and recipients."
			}
			var i = 0
			var notSetup: [Address] = []
			while i < metadataIds.length {
				if let recipientCollection = getAccount(recipients[i]).getCapability(ExampleNFT.CollectionPublicPath).borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>() {
					self.mintNFT(metadataId: metadataIds[i], recipient: recipientCollection)
				} else {
					notSetup.append(recipients[i])
				}
				i = i + 1
			}

			emit MintBatch(metadataIds: metadataIds, intendedRecipients: recipients, notSetup: notSetup)
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

	// Get information about a NFTMetadata
	pub fun getNFTMetadata(_ metadataId: UInt64): NFTMetadata? {
		return self.metadatas[metadataId]
	}

	pub fun getNFTMetadatas(): {UInt64: NFTMetadata} {
		return self.metadatas
	}

	pub fun getPrimaryBuyers(): {UInt64: Address} {
		return self.primaryBuyers
	}

	pub fun getCollectionInfo(): {String: AnyStruct} {
		let collectionInfo = self.collectionInfo
		collectionInfo["metadatas"] = self.metadatas
		collectionInfo["primaryBuyers"] = self.primaryBuyers
		collectionInfo["totalSupply"] = self.totalSupply
		collectionInfo["nextMetadataId"] = self.nextMetadataId
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
	pub fun getPriceOfNFT(_ metadataId: UInt64): UFix64? {
		return self.getCollectionAttribute(key: "lotteryBuying") as! Bool == false ? self.getNFTMetadata(metadataId)?.price : self.getCollectionAttribute(key: "price") as! UFix64
	}

	init(
		_name: String, 
		_description: String, 
		_imagePath: String, 
		_bannerImagePath: String?,
		_minting: Bool, 
		_royalty: MetadataViews.Royalty?,
		_defaultPrice: UFix64,
		_ipfsCID: String,
		_lotteryBuying: Bool,
		_socials: {String: MetadataViews.ExternalURL},
		_mintVerifiers: [{MintVerifiers.IVerifier}]
	) {
		// Collection Info
		self.collectionInfo = {}
		self.collectionInfo["name"] = _name
		self.collectionInfo["description"] = _description
		self.collectionInfo["image"] = MetadataViews.IPFSFile(
			cid: _ipfsCID,
			path: _imagePath
		)
		self.collectionInfo["bannerImage"] = MetadataViews.IPFSFile(
			cid: _ipfsCID,
			path: _bannerImagePath ?? _imagePath
		)
		self.collectionInfo["ipfsCID"] = _ipfsCID
		self.collectionInfo["socials"] = _socials
		self.collectionInfo["minting"] = _minting
		self.collectionInfo["lotteryBuying"] = _lotteryBuying
		if let royalty = _royalty {
			assert(royalty.cut <= 0.95, message: "The royalty cut cannot be bigger than 95% because 5% goes to Emerald City treasury for primary sales.")
			self.collectionInfo["royalty"] = royalty
		}
		self.collectionInfo["price"] = _defaultPrice
		self.collectionInfo["dateCreated"] = getCurrentBlock().timestamp
		self.collectionInfo["mintVerifiers"] = _mintVerifiers
		self.collectionInfo["profit"] = 0.0

		self.nextMetadataId = 0
		self.totalSupply = 0
		self.metadatas = {}
		self.primaryBuyers = {}

		// Set the named paths
		// We include the user's address in the paths.
		// This is to prevent clashing with existing 
		// Collection paths in the ecosystem.
		self.CollectionStoragePath = /storage/ExampleNFTCollection_USER_ADDR
		self.CollectionPublicPath = /public/ExampleNFTCollection_USER_ADDR
		self.CollectionPrivatePath = /private/ExampleNFTCollection_USER_ADDR
		self.AdministratorStoragePath = /storage/ExampleNFTAdministrator_USER_ADDR

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
 