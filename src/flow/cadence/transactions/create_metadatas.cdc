import ExampleNFT from "../ExampleNFT.cdc"

// Put a batch of up to 500 NFT Metadatas inside the contract

transaction(names: [String], descriptions: [String], thumbnails: [String], prices: [UFix64?], extras: [{String: String}]) {
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
      self.Administrator.createNFTMetadata(
        name: names[i], 
        description: descriptions[i], 
        thumbnailPath: thumbnails[i],
        price: prices[i],
        extra: extras[i]
      )
      i = i + 1
    }
  }
}