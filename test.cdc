import FUSD from "./src/flow/cadence/utility/FUSD.cdc"
import FungibleToken from "./src/flow/cadence/utility/FungibleToken.cdc"

pub fun main() {

  let thing = getAccount(0x5643fd47a29770e7).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver).borrow()!
}