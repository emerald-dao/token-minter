transaction(
  contractName: String,
  description: String,
  imageHash: String,
  minting: Bool,
  price: UFix64,
  ipfsCID: String,
  contractCode: String
) {
  prepare(deployer: AuthAccount) {
    log(contractCode)
    deployer.contracts.add(
      name: contractName, 
      code: contractCode.decodeHex(),
      _name: contractName,
      _description: description,
      _image: imageHash,
      _minting: minting,
      _price: price,
      _ipfsCID: ipfsCID
    )
  }
}