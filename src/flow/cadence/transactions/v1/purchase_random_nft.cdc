import ExampleNFT from "../../ExampleNFT.cdc"
import FungibleToken from "../../utility/FungibleToken.cdc"
import NonFungibleToken from "../../utility/NonFungibleToken.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"
import TouchstonePurchases from "../../TouchstonePurchases.cdc"
import FlowToken from "../../utility/FlowToken.cdc"
import FUSD from "../../utility/FUSD.cdc"
import PRNG from "../../utility/PRNG.cdc"

transaction(price: UFix64, contractName: String, contractAddress: Address) {
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
    var chosenMetadata: ExampleNFT.NFTMetadata? = nil
    var chosenMetadataId: UInt64? = nil
    var chosenSerial: UInt64? = nil
    let metadatas: [ExampleNFT.NFTMetadata] = ExampleNFT.getNFTMetadatas().values

    // random
    let generator <- PRNG.createFrom(blockHeight: getCurrentBlock().height, uuid: 100)
    while true {
      // call the range function to give you an integer between min and max
      let answer: UInt256 = generator.range(0, UInt256(metadatas.length - 1))

      let nftMetadata: ExampleNFT.NFTMetadata = metadatas[answer]

      if Int(nftMetadata.supply) != nftMetadata.purchasers.length {
        chosenMetadataId = nftMetadata.metadataId
        chosenSerial = UInt64(nftMetadata.purchasers.length)
        chosenMetadata = nftMetadata
        break
      } else {
        metadatas.remove(at: answer)
      }
    }
    // destroy the generator resource
    destroy generator

    let nftId = ExampleNFT.mintNFT(metadataId: chosenMetadataId!, recipient: self.CollectionPublic, payment: <- payment, serial: chosenSerial!)
    let nftMetadata: ExampleNFT.NFTMetadata = chosenMetadata!
    let display = MetadataViews.Display(
      name: nftMetadata.name,
      description: nftMetadata.description,
      thumbnail: nftMetadata.thumbnail ?? nftMetadata.image
    )
    self.Purchases.addPurchase(uuid: nftId, metadataId: chosenMetadataId!, display: display, contractAddress: contractAddress, contractName: contractName)
  }
}
 