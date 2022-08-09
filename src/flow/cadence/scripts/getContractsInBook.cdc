import TouchstoneContracts from "../TouchstoneContracts.cdc"

pub fun main(user: Address): [String] {
  return TouchstoneContracts.getUserTouchstoneCollections(user: user)
}