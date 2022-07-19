import MetadataViews from "./utility/MetadataViews.cdc"

pub contract interface Touchstone {
  // Must have an NFTMetadata with these things
  pub struct NFTMetadata {
    // A unique id each metadata struct 
    // must have
		pub let metadataId: UInt64
    // Name of the NFT
		pub let name: String
    // Description of the NFT
		pub let description: String 
    // Thumbnail of the NFT
		pub let thumbnail: MetadataViews.IPFSFile
    // All of the extra metadata
		pub var extra: {String: String}
	}

  // Must have a CollectionInfo with these things
  pub struct CollectionInfo {
    // Name of the collection
    pub let name: String
    // Description of the collection
    pub let description: String
    // Main logo of the collection
    pub let image: MetadataViews.IPFSFile
    // The default price of the collection
    pub let price: UFix64
    // All of the NFTs
    pub let metadatas: [NFTMetadata]
    // A list of ids of the NFTs
    // that have been purchased
    pub let purchasedNFTs: [UInt64]
  }

  pub fun getCollectionInfo(): CollectionInfo
}