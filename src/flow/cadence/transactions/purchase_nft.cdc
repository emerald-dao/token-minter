import ExampleNFT from "../ExampleNFT.cdc"
import FlowToken from "../utility/FlowToken.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"

transaction(metadataId: UInt64, price: UFix64) {
  let FlowTokenVault: &FlowToken.Vault
  let CollectionPublic: &ExampleNFT.Collection{NonFungibleToken.Receiver}
  prepare(signer: AuthAccount) {
    self.FlowTokenVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!

    if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
      signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
      signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }

    self.CollectionPublic = signer.getCapability(ExampleNFT.CollectionPublicPath)
                              .borrow<&ExampleNFT.Collection{NonFungibleToken.Receiver}>()
                              ?? panic("Did not properly set up the Example Collection.")
  }

  execute { 
    let payment <- self.FlowTokenVault.withdraw(amount: price) as! @FlowToken.Vault
    ExampleNFT.mintNFT(metadataId: metadataId, recipient: self.CollectionPublic, payment: <- payment)
  }
}