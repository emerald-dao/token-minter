import ExampleNFT from "../ExampleNFT.cdc"

transaction(names: [String], descriptions: [String], thumbnails: [String]) {
  let Administrator: &ExampleNFT.Administrator
  prepare(deployer: AuthAccount) {
    self.Administrator = deployer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)
                          ?? panic("This account has not deployed the contract.")
  }

  pre {
    names.length <= 500: 
      "There must be less than or equal to 500 NFTs being added."
    names.length == descriptions.length && descriptions.length == thumbnails.length:
      "You must pass in a same amount of each parameter."
  }

  execute {
    var i = 0
    while i < names.length {
      self.Administrator.createTemplate(
        name: names[i], 
        description: descriptions[i], 
        thumbnail: thumbnails[i]
      )
      i = i + 1
    }
  }
}