import ExampleNFT from "../../ExampleNFT.cdc"
import NonFungibleToken from "../../utility/NonFungibleToken.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"
import TouchstonePurchases from "../../TouchstonePurchases.cdc"

transaction(contractName: String, contractAddress: Address) {
  let Collection: &ExampleNFT.Collection
  let Purchases: &TouchstonePurchases.Purchases
  let User: Address
  prepare(signer: AuthAccount) {
    // Setup
    if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
      signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
      signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }

    if signer.borrow<&TouchstonePurchases.Purchases>(from: TouchstonePurchases.PurchasesStoragePath) == nil {
      signer.save(<- TouchstonePurchases.createPurchases(), to: TouchstonePurchases.PurchasesStoragePath)
      signer.link<&TouchstonePurchases.Purchases{TouchstonePurchases.PurchasesPublic}>(TouchstonePurchases.PurchasesPublicPath, target: TouchstonePurchases.PurchasesStoragePath)
    }

    self.Collection = signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
                              ?? panic("Did not properly set up the Example Collection.")

    self.Purchases = signer.borrow<&TouchstonePurchases.Purchases>(from: TouchstonePurchases.PurchasesStoragePath)!
    self.User = signer.address
  }

  execute { 
    let claimableNFTs: {UInt64: ExampleNFT.NFTMetadata} = ExampleNFT.getClaimableNFTs(user: self.User)
    for id in claimableNFTs.keys {
      let nftMetadata: ExampleNFT.NFTMetadata = claimableNFTs[id]!
      let display = MetadataViews.Display(
        name: nftMetadata.name,
        description: nftMetadata.description,
        thumbnail: nftMetadata.thumbnail ?? nftMetadata.image
      )
      self.Purchases.addPurchase(uuid: id, metadataId: nftMetadata.metadataId, display: display, contractAddress: contractAddress, contractName: contractName)
    }
    self.Collection.claim()
  }
}