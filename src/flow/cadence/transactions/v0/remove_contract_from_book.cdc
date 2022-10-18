import TouchstoneContracts from "../../TouchstoneContracts.cdc"

transaction(contractName: String) {
  let ContractsBook: &TouchstoneContracts.ContractsBook

  prepare(deployer: AuthAccount) {
    self.ContractsBook = deployer.borrow<&TouchstoneContracts.ContractsBook>(from: TouchstoneContracts.ContractsBookStoragePath)!
  }

  execute {
    self.ContractsBook.removeContract(contractName: contractName)
  }
}