import TouchstoneContracts from "../TouchstoneContracts.cdc"

pub fun main(contractName: String): Bool {
  return TouchstoneContracts.getGlobalContractsBook().getReservationStatus(contractName: contractName) != TouchstoneContracts.ReservationStatus.active
}
 