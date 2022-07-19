transaction(
  contractName: String,
  contractCode: String,
  collectionName: String,
  description: String,
  imagePath: String,
  minting: Bool,
  price: UFix64,
  ipfsCID: String
) {
  prepare(deployer: AuthAccount) {
    log(contractCode)
    deployer.contracts.add(
      name: contractName, 
      code: contractCode.decodeHex(),
      _name: collectionName,
      _description: description,
      _imagePath: imagePath,
      _minting: minting,
      _price: price,
      _ipfsCID: ipfsCID
    )
  }
}