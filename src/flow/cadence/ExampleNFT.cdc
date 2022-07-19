// CREATED BY: Touchstone (https://touchstone.city/), a platform crafted by your best friends at Emerald City DAO (https://ecdao.org/).

import NonFungibleToken from "./utility/NonFungibleToken.cdc"
import MetadataViews from "./utility/MetadataViews.cdc"
import FungibleToken from "./utility/FungibleToken.cdc"
import FlowToken from "./utility/FlowToken.cdc"
import Touchstone from "./Touchstone.cdc"

pub contract ExampleNFT: NonFungibleToken, Touchstone {

	// Collection Info
	pub var name: String
	pub var description: String
	pub var image: MetadataViews.IPFSFile
	pub var ipfsCID: String
	pub var price: UFix64
	pub let dateCreated: UFix64

	// Contract Info
	pub var nextMetadataId: UInt64
	pub var totalSupply: UInt64
	pub var minting: Bool

	// Events
	pub event ContractInitialized()
	pub event Withdraw(id: UInt64, from: Address?)
	pub event Deposit(id: UInt64, to: Address?)
	pub event TouchstonePurchase(id: UInt64, recipient: Address, metadataId: UInt64, name: String, description: String, thumbnail: MetadataViews.IPFSFile)

	// Paths
	pub let CollectionStoragePath: StoragePath
	pub let CollectionPublicPath: PublicPath
	pub let CollectionPrivatePath: PrivatePath
	pub let AdministratorStoragePath: StoragePath

	// Maps metadataId of NFT to NFTMetadata
	access(account) var metadatas: {UInt64: NFTMetadata}

	// Maps the metadataId of an NFT to the primary buyer
	//
	// You can also get a list of purchased NFTs
	// by doing `primaryBuyers.keys`
	access(account) var primaryBuyers: {UInt64: Address}

	pub struct NFTMetadata {
		pub let metadataId: UInt64
		pub let name: String
		pub let description: String 
		pub let thumbnail: MetadataViews.IPFSFile
		pub var extra: {String: AnyStruct}

		init(_name: String, _description: String, _thumbnailPath: String, _extra: {String: AnyStruct}) {
			self.metadataId = ExampleNFT.nextMetadataId
			self.name = _name
			self.description = _description
			self.thumbnail = MetadataViews.IPFSFile(
				cid: ExampleNFT.ipfsCID,
				path: _thumbnailPath
			)
			self.extra = _extra

			ExampleNFT.nextMetadataId = ExampleNFT.nextMetadataId + 1
		}
	}

	pub struct CollectionInfo {
		pub let name: String
		pub let description: String
		pub let image: MetadataViews.IPFSFile
		pub let price: UFix64
		pub let dateCreated: UFix64
		pub let totalSupply: UInt64
		pub let ipfsCID: String?
		pub let minting: Bool
		pub let metadatas: [Touchstone.NFTMetadata]
		pub let purchasedNFTs: {UInt64: Address}

		init() {
			self.name = ExampleNFT.name
			self.description = ExampleNFT.description
			self.image = ExampleNFT.image
			self.price = ExampleNFT.price
			self.dateCreated = ExampleNFT.dateCreated
			self.totalSupply = ExampleNFT.totalSupply
			self.ipfsCID = ExampleNFT.ipfsCID
			self.minting = ExampleNFT.minting
			self.metadatas = ExampleNFT.getNFTMetadatas().values
			self.purchasedNFTs = ExampleNFT.getPrimaryBuyers()
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
          return MetadataViews.ExternalURL("https://touchstone.city/".concat((self.owner!.address as Address).toString()).concat("/ExampleNFT"))
				case Type<MetadataViews.NFTCollectionDisplay>():
					let media = MetadataViews.Media(
						file: ExampleNFT.image,
						mediaType: "image"
					)
					return MetadataViews.NFTCollectionDisplay(
						name: ExampleNFT.name,
						description: ExampleNFT.description,
						externalURL: MetadataViews.ExternalURL("https://touchstone.city/".concat((self.owner!.address as Address).toString()).concat("/ExampleNFT")),
						squareImage: media,
						bannerImage: media,
						socials: {
							"twitter": MetadataViews.ExternalURL("https://twitter.com/emerald_dao"),
							"discord": MetadataViews.ExternalURL("https://discord.gg/emeraldcity")
						}
					)
				case Type<MetadataViews.Royalties>():
					return MetadataViews.Royalties([
						MetadataViews.Royalty(
							_recipient: getAccount(0x5643fd47a29770e7).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
							_cut: 0.05,
							_description: "Emerald City DAO receives a 5% royalty fee because this collection was created using Touchstone (https://touchstone.city/), a tool for NFTs created by Emerald City DAO."
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
			self.minting: "Minting is currently closed by the Administrator!"
			payment.balance == self.price: "Payment does not match the price."
		}
		// Handle Emerald City DAO royalty (5%)
		let ecDAO = getAccount(0x86d486feb7683e02).getCapability(/public/flowTokenReceiver)
								.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
		ecDAO.deposit(from: <- payment.withdraw(amount: payment.balance * 0.05))

		// Give the rest to the collection owner
		let paymentRecipient = self.account.getCapability(/public/flowTokenReceiver)
								.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
		paymentRecipient.deposit(from: <- payment)

		let nft <- create NFT(_metadataId: metadataId, _recipient: recipient.owner!.address)
		let metadata = self.getNFTMetadata(metadataId)!
		emit TouchstonePurchase(id: nft.id, recipient: recipient.owner!.address, metadataId: metadataId, name: metadata.name, description: metadata.description, thumbnail: metadata.thumbnail)
		
		recipient.deposit(token: <- nft)
	}

	pub resource Administrator {
		pub fun createNFTMetadata(name: String, description: String, thumbnailPath: String, extra: {String: AnyStruct}) {
			ExampleNFT.metadatas[ExampleNFT.nextMetadataId] = NFTMetadata(
				_name: name,
				_description: description,
				_thumbnailPath: thumbnailPath,
				_extra: extra
			)
		}

		// mintNFT mints a new NFT and deposits 
		// it in the recipients collection
		pub fun mintNFT(metadataId: UInt64, recipient: &{NonFungibleToken.CollectionPublic}) {
			recipient.deposit(token: <- create NFT(_metadataId: metadataId, _recipient: recipient.owner!.address))
		}

		// turn minting on/off
		pub fun toggleMinting(): Bool {
			ExampleNFT.minting = !ExampleNFT.minting
			return ExampleNFT.minting
		}

		// create a new Administrator resource
		pub fun createAdmin(): @Administrator {
			return <- create Administrator()
		}

		pub fun changePrice(newPrice: UFix64) {
			ExampleNFT.price = newPrice
		}

		pub fun changeName(newName: String) {
			ExampleNFT.name = newName
		}

		pub fun changeDescription(newDescription: String) {
			ExampleNFT.description = newDescription
		}

		pub fun changeImage(cid: String, path: String?) {
			ExampleNFT.image = MetadataViews.IPFSFile(
				cid: cid,
				path: path
			)
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

	pub fun getCollectionInfo(): CollectionInfo {
		return CollectionInfo()
	}

	init(
		_name: String, 
		_description: String, 
		_imagePath: String, 
		_minting: Bool, 
		_price: UFix64,
		_ipfsCID: String
	) {
		// Collection Info
		self.name = _name
		self.description = _description
		self.image = MetadataViews.IPFSFile(
			cid: _ipfsCID,
			path: _imagePath
		)
		self.ipfsCID = _ipfsCID

		// Initialize default info
		self.minting = _minting
		self.price = _price
		self.dateCreated = getCurrentBlock().timestamp

		self.nextMetadataId = 0
		self.totalSupply = 0
		self.metadatas = {}
		self.primaryBuyers = {}

		// Set the named paths
		// We prefix the paths with 'T' for "Touchstone". This is also
		// to prevent clashing with existing Collection paths in the 
		// ecosystem.
		self.CollectionStoragePath = /storage/TExampleNFTCollectionUSER_ADDR
		self.CollectionPublicPath = /public/TExampleNFTCollectionUSER_ADDR
		self.CollectionPrivatePath = /private/TExampleNFTCollectionUSER_ADDR
		self.AdministratorStoragePath = /storage/TExampleNFTAdministratorUSER_ADDR

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
 