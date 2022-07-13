pub contract TouchstoneRegistry {

  pub let RegistryStoragePath: StoragePath 
  pub let RegistryPublicPath: PublicPath

  pub struct ContractData {
    pub let name: String
    pub let description: String
    pub let thumbnail: String
    pub let address: Address

    init(_name: String, _description: String, _thumbnail: String, _address: Address) {
      self.name = _name
      self.description = _description
      self.thumbnail = _thumbnail
      self.address = _address
    }
  }

  pub resource interface RegistryPublic {
    pub fun getCreatedContracts(): {String: ContractData}
  }

  pub resource Registry: RegistryPublic {
    access(self) var createdContracts: {String: ContractData}

    // This can be used to:
    // 1. Create a new ContractData
    // 2. Update an old one
    pub fun addContractData(contractName: String, description: String, thumbnail: String) {
      self.createdContracts[contractName] = ContractData(
        _name: contractName,
        _description: description,
        _thumbnail: thumbnail,
        _address: self.owner!.address
      )
    }

    pub fun removeContract(contractName: String) {
      self.createdContracts.remove(key: contractName)
    }

    pub fun getCreatedContracts(): {String: ContractData} {
      return self.createdContracts
    }

    init() {
      self.createdContracts = {}
    }
  }

  pub fun getAccountsContracts(address: Address): {String: ContractData} {
    let ref = getAccount(address).getCapability(self.RegistryPublicPath)
                .borrow<&Registry{RegistryPublic}>()
                ?? panic("This address does not have a Touchstone Registry.")
    return ref.getCreatedContracts()
  }

  init() {
    self.RegistryStoragePath = /storage/TouchstoneRegistryStoragePath
    self.RegistryPublicPath = /public/TouchstoneRegistryPublicPath
  }
}