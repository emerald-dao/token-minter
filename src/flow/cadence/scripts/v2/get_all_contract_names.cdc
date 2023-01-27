import TouchstoneContracts from "../../TouchstoneContracts.cdc"

pub fun main(): [String] {
  let book = TouchstoneContracts.getGlobalContractsBook()
  return book.getAllReservations().keys
}