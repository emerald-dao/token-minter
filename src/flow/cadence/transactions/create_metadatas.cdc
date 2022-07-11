import ExampleNFT from "../ExampleNFT.cdc"

// Put a batch of up to 500 NFT Metadatas inside the contract
// Example names: `["Education", "Building", "Governance"]`
// Example descriptions: `[
//  "This is the logo of the Education Guild", 
//  "This is the logo of the Building Guild", 
//  "This is the logo of the Governance Guild"
// ]`
// Example thumbnails: `[
//  "QmYVKNWdm2961QtHz721tdA8dvBT116eT2DtATsX53Kt28",
//  "QmPkJbnJSt3ZkHuGAnHyHCAhWVrneRrK6VHMjgu5oPGnoq",
//  "QmcpmzEDmZtP37csyNaYaxzhoMQmmUrQsihE3x2XGKsg1Z"
// ]`

transaction(names: [String], descriptions: [String], thumbnails: [String]) {
  let Administrator: &ExampleNFT.Administrator
  prepare(deployer: AuthAccount) {
    self.Administrator = deployer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)
                          ?? panic("This account has not deployed the contract.")
  }

  pre {
    names.length <= 500: 
      "There must be less than or equal to 500 Templates being added at a time."
    names.length == descriptions.length && descriptions.length == thumbnails.length:
      "You must pass in a same amount of each parameter."
  }

  execute {
    var i = 0
    while i < names.length {
      self.Administrator.createNFTMetadata(
        name: names[i], 
        description: descriptions[i], 
        thumbnailPath: thumbnails[i],
        extra: {}
      )
      i = i + 1
    }
  }
}