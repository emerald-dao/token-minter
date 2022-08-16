import TouchstoneContracts from "../TouchstoneContracts.cdc"

pub fun main(contractName: String): Bool {
  return TouchstoneContracts.getReservation(contractName: contractName) == TouchstoneContracts.ReservationStatus.notFound
}
 