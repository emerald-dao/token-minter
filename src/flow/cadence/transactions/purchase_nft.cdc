import ExampleNFT from "../ExampleNFT.cdc"
import FlowToken from "../utility/FlowToken.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"
import MetadataViews from "../utility/MetadataViews.cdc"
import TouchstonePurchases from "../TouchstonePurchases.cdc"

transaction(metadataId: UInt64, price: UFix64, contractName: String, contractAddress: Address) {
  let FlowTokenVault: &FlowToken.Vault
  let CollectionPublic: &ExampleNFT.Collection{NonFungibleToken.Receiver}
  let Purchases: &TouchstonePurchases.Purchases
  prepare(signer: AuthAccount) {
    self.FlowTokenVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!

    if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
      signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
      signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }

    if signer.borrow<&TouchstonePurchases.Purchases>(from: TouchstonePurchases.PurchasesStoragePath) == nil {
      signer.save(<- TouchstonePurchases.createPurchases(), to: TouchstonePurchases.PurchasesStoragePath)
      signer.link<&TouchstonePurchases.Purchases{TouchstonePurchases.PurchasesPublic}>(TouchstonePurchases.PurchasesPublicPath, target: TouchstonePurchases.PurchasesStoragePath)
    }

    self.CollectionPublic = signer.getCapability(ExampleNFT.CollectionPublicPath)
                              .borrow<&ExampleNFT.Collection{NonFungibleToken.Receiver}>()
                              ?? panic("Did not properly set up the Example Collection.")

    self.Purchases = signer.borrow<&TouchstonePurchases.Purchases>(from: TouchstonePurchases.PurchasesStoragePath)!
  }

  execute { 
    let payment <- self.FlowTokenVault.withdraw(amount: price) as! @FlowToken.Vault
    let nftId = ExampleNFT.mintNFT(metadataId: metadataId, recipient: self.CollectionPublic, payment: <- payment)
    let nftMetadata: ExampleNFT.NFTMetadata = ExampleNFT.getNFTMetadata(metadataId)!
    let display = MetadataViews.Display(
      name: nftMetadata.name,
      description: nftMetadata.description,
      thumbnail: nftMetadata.thumbnail
    )
    self.Purchases.addPurchase(uuid: nftId, metadataId: metadataId, display: display, contractAddress: contractAddress, contractName: contractName)
  }
}