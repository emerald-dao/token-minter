// This is an example implementation of a Flow Non-Fungible Token
// It is not part of the official standard but it assumed to be
// very similar to how many NFTs would implement the core functionality.
import NonFungibleToken from "./NonFungibleToken.cdc"
import MetadataViews from "./MetadataViews.cdc"
	
pub contract ExampleNFT: NonFungibleToken {

		// Collection Info
		pub var name: String
		pub var description: String
		pub var image: String
	
		// the amount of NFTs minted
		pub var totalSupply: UInt64
		// The key that maps to a Template in `templates`
		pub var nextTemplateId: UInt64
		// whether or not public minting is open
		pub var minting: Bool
		
		pub event ContractInitialized()
		pub event Withdraw(id: UInt64, from: Address?)
		pub event Deposit(id: UInt64, to: Address?)

		pub let CollectionStoragePath: StoragePath
		pub let CollectionPublicPath: PublicPath
		pub let AdministratorStoragePath: StoragePath

		// maps serial to Template
		// if an NFT was minted with the serial, it no longer
		// exists in this dictionary (so if all the NFTs are minted,
		// this will be empty)
		access(account) var initialTemplates: {UInt64: Template}

		pub struct Template {
			
			pub let name: String
			pub let description: String
			pub let thumbnail: String

			init(
				name: String,
				description: String,
				thumbnail: String
			) {
				self.name = name
				self.description = description
				self.thumbnail = thumbnail
				ExampleNFT.nextTemplateId = ExampleNFT.nextTemplateId + 1
			}
		}

		pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
			// The 'id' is the same as the 'uuid'
			pub let id: UInt64
			// The 'serial' is what maps to its 'Template'
			pub let serial: UInt64
			pub let template: Template
 
			init() {
				pre {
					ExampleNFT.minting: "Minting is currently closed by the Administrator!"
				}
				self.id = self.uuid
				self.serial = ExampleNFT.totalSupply
				self.template = ExampleNFT.initialTemplates.remove(key: self.serial) ?? panic("There does not exist a Template for this NFT.")

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
				return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
			}

			pub fun borrowViewResolver(id: UInt64): &{MetadataViews.Resolver} {
				let token = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)
				let nft = token as! &ExampleNFT.NFT
				return nft as &{MetadataViews.Resolver}
			}

			init () {
				self.ownedNFTs <- {}
			}

			destroy() {
				destroy self.ownedNFTs
			}
		}
		
		pub resource Administrator {

			pub fun createTemplate(
				name: String,
				description: String,
				thumbnail: String
			) {
				ExampleNFT.initialTemplates[ExampleNFT.nextTemplateId] = Template(
					name: name,
					description: description,
					thumbnail: thumbnail
				)
			}

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

			pub fun changeName(name: String) {
				ExampleNFT.name = name
			}

			pub fun changeDescription(description: String) {
				ExampleNFT.description = description
			}

			pub fun changeImage(image: String) {
				ExampleNFT.image = image
			}
		}

		// public function that anyone can call to create a new empty collection
		pub fun createEmptyCollection(): @NonFungibleToken.Collection {
			return <- create Collection()
		}

		// Get information about a Template
		pub fun getTemplate(_ serial: UInt64): Template? {
			return self.initialTemplates[serial]
		}

		pub fun getTemplates(): {UInt64: Template} {
			return self.initialTemplates
		}

		init(_name: String, _description: String, _image: String) {
			// Collection Info
			self.name = _name
			self.description = _description
			self.image = _image

			// Initialize the total supply
			self.nextTemplateId = 0
			self.totalSupply = 0
			self.minting = true
			
			self.initialTemplates = {}

			// Set the named paths
			self.CollectionStoragePath = /storage/ExampleNFTCollection0x86d486feb7683e02
			self.CollectionPublicPath = /public/ExampleNFTCollection0x86d486feb7683e02
			self.AdministratorStoragePath = /storage/ExampleNFTAdministrator0x86d486feb7683e02

			// Create a Collection resource and save it to storage
			let collection <- create Collection()
			self.account.save(<-collection, to: self.CollectionStoragePath)

			// create a public capability for the collection
			self.account.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(
				self.CollectionPublicPath,
				target: self.CollectionStoragePath
			)

			// Create a Administrator resource and save it to storage
			let administrator <- create Administrator()
			self.account.save(<- administrator, to: self.AdministratorStoragePath)

			emit ContractInitialized()
		}
	}