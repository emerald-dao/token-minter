transaction(contractName: String, contractCode: String) {
  prepare(deployer: AuthAccount) {
    deployer.contracts.add(name: contractName, code: contractCode.decodeHex())
  }
}