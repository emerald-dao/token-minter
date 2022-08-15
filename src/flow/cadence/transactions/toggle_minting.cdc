import ExampleNFT from "../ExampleNFT.cdc"

transaction() {
  let Administrator: &ExampleNFT.Administrator
  prepare(deployer: AuthAccount) {
    self.Administrator = deployer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)
                          ?? panic("This account has not deployed the contract.")
  }

  execute {
    self.Administrator.changeField(key: "minting", value: !(ExampleNFT.getCollectionAttribute(key: "minting") as! Bool))
  }
}