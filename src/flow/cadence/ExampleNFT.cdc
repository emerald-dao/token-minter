// This is an example implementation of a Flow Non-Fungible Token
	// It is not part of the official standard but it assumed to be
	// very similar to how many NFTs would implement the core functionality.
	import NonFungibleToken from "./NonFungibleToken.cdc"
	import MetadataViews from "./MetadataViews.cdc"
    import FungibleToken from "./FungibleToken.cdc"
    import FlowToken from "./FlowToken.cdc"
	
	
pub contract ExampleNFT: NonFungibleToken {
	
		pub var totalSupply: UInt64
		pub var minting: Bool
		pub var price: UFix64

		pub event ContractInitialized()
		pub event Withdraw(id: UInt64, from: Address?)
		pub event Deposit(id: UInt64, to: Address?)

		pub let CollectionStoragePath: StoragePath
		pub let CollectionPublicPath: PublicPath
		pub let AdministratorStoragePath: StoragePath

		access(account) var templates: {UInt64: Template}

		pub struct Template {
			
			pub let name: String
			pub let description: String
			pub let thumbnail: String

			init(
				name: String,
				description: String,
				thumbnail: String,
			) {
				self.name = name
				self.description = description
				self.thumbnail = thumbnail
			}
		}

		pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
			// The 'id' is the same as the 'uuid'
			pub let id: UInt64
			// The 'serial' is what maps to its 'Template'
			pub let serial: UInt64

			init() {
				pre {
					ExampleNFT.minting: "Minting is currently closed by the Administrator!"
					
				}
				self.id = self.uuid
				self.serial = ExampleNFT.totalSupply

				ExampleNFT.totalSupply = ExampleNFT.totalSupply + 1
			}
	
			pub fun getViews(): [Type] {
					return [
							Type<MetadataViews.Display>()
					]
			}

			pub fun resolveView(_ view: Type): AnyStruct? {
				let template = ExampleNFT.getTemplate(self.serial) ?? panic("Template doesn't exist!")
				switch view {
					case Type<MetadataViews.Display>():
						return MetadataViews.Display(
							name: template.name,
							description: template.description,
							thumbnail: MetadataViews.IPFSFile(
								cid: template.thumbnail,
								path: nil
							)
						)
				}
				return nil
			}
		}

		pub resource interface NFTCollectionPublic {
			pub fun deposit(token: @NonFungibleToken.NFT)
			pub fun getIDs(): [UInt64]
			pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
		}

		pub resource Collection: NFTCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
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
				let token <- token as! @ExampleNFT.NFT

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
				return &self.ownedNFTs[id] as &NonFungibleToken.NFT
			}

			pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
				let token = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
				let nft = token as! &ExampleNFT.NFT
				return nft as &AnyResource{MetadataViews.Resolver}
			}

			init () {
				self.ownedNFTs <- {}
			}

			destroy() {
				destroy self.ownedNFTs
			}
		}

		// public function that anyone can call to create a new empty collection
		pub fun createEmptyCollection(): @NonFungibleToken.Collection {
			return <- create Collection()
		}

		
		// mintNFT mints a new NFT and deposits 
		// it in the recipients collection
		pub fun mintNFT(
			recipient: &{NonFungibleToken.CollectionPublic},
			payment: @FlowToken.Vault
		) {
			
			pre {
				payment.balance == ExampleNFT.price: "You did not pass in the correct amount of FlowToken."
			}

			let paymentRecipient = ExampleNFT.account.getCapability(/public/flowTokenReceiver)
																.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!

			paymentRecipient.deposit(from: <- payment)
			
			recipient.deposit(token: <- create NFT())
		}
		
		pub resource Administrator {

			// mintNFT mints a new NFT and deposits 
			// it in the recipients collection
			pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}) {
				recipient.deposit(token: <- create NFT())
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
		}

		// Get information about a Template
		pub fun getTemplate(_ serial: UInt64): Template? {
			return self.templates[serial]
		}

		init() {
			// Initialize the total supply
			self.totalSupply = 0
			self.minting = true
			self.price = 100.00
			self.templates = {}

			// Set the named paths
			self.CollectionStoragePath = /storage/ExampleNFTCollection0xe37a242dfff69bbc
			self.CollectionPublicPath = /public/ExampleNFTCollection0xe37a242dfff69bbc
			self.AdministratorStoragePath = /storage/ExampleNFTAdministrator0xe37a242dfff69bbc

			// Create a Collection resource and save it to storage
			let collection <- create Collection()
			self.account.save(<-collection, to: self.CollectionStoragePath)

			// create a public capability for the collection
			self.account.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, ExampleNFT.NFTCollectionPublic, MetadataViews.ResolverCollection}>(
				self.CollectionPublicPath,
				target: self.CollectionStoragePath
			)

			// Create a Administrator resource and save it to storage
			let administrator <- create Administrator()
			self.account.save(<- administrator, to: self.AdministratorStoragePath)

			emit ContractInitialized()
		}
	}
  