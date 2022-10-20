import TouchstoneContracts from "../../TouchstoneContracts.cdc"

pub fun main(contractName: String): Address? {
  let public = TouchstoneContracts.getGlobalContractsBook()
  return public.getAddressFromContractName(contractName: contractName)
}