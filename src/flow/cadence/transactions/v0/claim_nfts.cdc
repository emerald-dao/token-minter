import ExampleNFT from "../../ExampleNFT.cdc"
import NonFungibleToken from "../../utility/NonFungibleToken.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"

transaction(contractName: String, contractAddress: Address) {
  let Collection: &ExampleNFT.Collection
  prepare(signer: AuthAccount) {
    // Setup
    if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
      signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
      signer.link<&ExampleNFT.Collection{ExampleNFT.CollectionPublic, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }

    self.Collection = signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
                              ?? panic("Did not properly set up the Example Collection.")
  }

  execute { 
    self.Collection.claim()
  }
}