import TouchstoneContracts from "../TouchstoneContracts.cdc"

pub fun main(contractName: String): Bool {
  return TouchstoneContracts.getGlobalContractsBook().getReservation(contractName: contractName) == TouchstoneContracts.ReservationStatus.notFound
}
 