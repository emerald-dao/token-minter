import ExampleNFT from "../../ExampleNFT.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"

// Put a batch of up to 500 NFT Metadatas inside the contract

transaction(
  names: [String], 
  descriptions: [String], 
  images: [String],
  thumbnails: [String?], 
  prices: [UFix64?], 
  extras: [{String: String}], 
  supplys: [UInt64],
  ipfsCID: String,
  lockSale: Bool
) {
  let Administrator: &ExampleNFT.Administrator
  prepare(deployer: AuthAccount) {
    self.Administrator = deployer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)
                          ?? panic("This account has not deployed the contract.")
  }

  pre {
    names.length <= 500: 
      "There must be less than or equal to 500 NFTMetadata being added at a time."
    names.length == descriptions.length && descriptions.length == thumbnails.length && thumbnails.length == extras.length:
      "You must pass in a same amount of each parameter."
  }

  execute {
    var i = 0
    while i < names.length {
      let metadata = ExampleNFT.Metadata(
        name: names[i],
        description: descriptions[i],
        image: MetadataViews.IPFSFile(
          cid: ipfsCID,
          path: images[i]
        ),
        thumbnail: thumbnails[i] == nil ? nil : MetadataViews.IPFSFile(cid: ipfsCID, path: thumbnails[i]),
        price: prices[i],
        extra: extras[i],
        supply: supplys[i],
        lockSale: lockSale
      )
      i = i + 1
    }
  }
}