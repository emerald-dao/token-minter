import ExampleNFT from "../ExampleNFT.cdc"

pub fun main(): CollectionInfo {
  return CollectionInfo(
    name: ExampleNFT.name,
    description: ExampleNFT.description,
    image: ExampleNFT.image,
    ipfsCID: ExampleNFT.ipfsCID,
    price: ExampleNFT.price,
    metadatas: ExampleNFT.getNFTMetadatas().values,
    purchasedNFTs: ExampleNFT.getPrimaryBuyers().keys
  )
}

pub struct CollectionInfo {
  pub let name: String
  pub let description: String
  pub let image: String
  pub let ipfsCID: String
  pub let price: UFix64
  pub let metadatas: [ExampleNFT.NFTMetadata]
  pub let purchasedNFTs: [UInt64]

  init(
    name: String, 
    description: String, 
    image: String, 
    ipfsCID: String, 
    price: UFix64,
    metadatas: [ExampleNFT.NFTMetadata], 
    purchasedNFTs: [UInt64]
  ) {
    self.name = name
    self.description = description
    self.image = image
    self.ipfsCID = ipfsCID
    self.price = price
    self.metadatas = metadatas
    self.purchasedNFTs = purchasedNFTs
  }
}