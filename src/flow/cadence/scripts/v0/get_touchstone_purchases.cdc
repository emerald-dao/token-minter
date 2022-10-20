import TouchstonePurchases from "../../TouchstonePurchases.cdc"

pub fun main(account: Address): {UInt64: TouchstonePurchases.Purchase} {
  if let purchases = getAccount(account).getCapability(TouchstonePurchases.PurchasesPublicPath).borrow<&TouchstonePurchases.Purchases{TouchstonePurchases.PurchasesPublic}>() {
    return purchases.getPurchases()
  } else {
    return {}
  }        
}