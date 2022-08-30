import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"

transaction(recipients: [Address], metadataIds: [UInt64]) {
  let Administrator: &ExampleNFT.Administrator
  prepare(deployer: AuthAccount) {
    self.Administrator = deployer.borrow<&ExampleNFT.Administrator>(from: ExampleNFT.AdministratorStoragePath)
                          ?? panic("This account has not deployed the contract.")
  }

  pre {
    recipients.length == metadataIds.length: "You need to provide the same number of recipients and ids."
  }

  execute {
    self.Administrator.mintBatch(metadataIds: metadataIds, recipients: recipients)
  }
}
 