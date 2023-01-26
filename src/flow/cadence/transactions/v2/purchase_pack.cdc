import ExampleNFT from "../../ExampleNFT.cdc"
import FungibleToken from "../../utility/FungibleToken.cdc"
import NonFungibleToken from "../../utility/NonFungibleToken.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"
import TouchstonePurchases from "../../TouchstonePurchases.cdc"
import FlowToken from "../../utility/FlowToken.cdc"
import FUSD from "../../utility/FUSD.cdc"
import EmeraldPass from "../../utility/EmeraldPass.cdc"

transaction(metadataId: UInt64, price: UFix64, contractName: String, contractAddress: Address) {
  let PaymentVault: &FungibleToken.Vault
  let CollectionPublic: &ExampleNFT.Collection{NonFungibleToken.Receiver}
  let Purchases: &TouchstonePurchases.Purchases
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

    if signer.borrow<&EmeraldPass.Vault>(from: EmeraldPass.VaultStoragePath) == nil {
      signer.save(<- EmeraldPass.createVault(), to: EmeraldPass.VaultStoragePath)
      signer.link<&EmeraldPass.Vault{EmeraldPass.VaultPublic}>(EmeraldPass.VaultPublicPath, target: EmeraldPass.VaultStoragePath)
    }

    // Rest of the code
    var paymentPath: StoragePath = /storage/PAYMENT_PATH
    
    self.PaymentVault = signer.borrow<&FungibleToken.Vault>(from: paymentPath)!

    self.CollectionPublic = signer.getCapability(ExampleNFT.CollectionPublicPath)
                              .borrow<&ExampleNFT.Collection{NonFungibleToken.Receiver}>()
                              ?? panic("Did not properly set up the Example Collection.")

    self.Purchases = signer.borrow<&TouchstonePurchases.Purchases>(from: TouchstonePurchases.PurchasesStoragePath)!
  }

  execute { 
    let payment: @FungibleToken.Vault <- self.PaymentVault.withdraw(amount: price) as! @FungibleToken.Vault
    let nftId = ExampleNFT.mintPack(metadataId: metadataId, recipient: self.CollectionPublic, payment: <- payment)
    let packMetadata: ExampleNFT.PackMetadata = ExampleNFT.getPackMetadata(metadataId)!
    let display = MetadataViews.Display(
      name: packMetadata.metadata.name,
      description: packMetadata.metadata.description,
      thumbnail: packMetadata.metadata.thumbnail ?? packMetadata.metadata.image
    )
    self.Purchases.addPurchase(uuid: nftId, metadataId: metadataId, display: display, contractAddress: contractAddress, contractName: contractName)
  }
}