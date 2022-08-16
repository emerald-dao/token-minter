import EmeraldPass from "./utility/EmeraldPass.cdc"

pub contract TouchstoneContracts {

  pub let ContractsBookStoragePath: StoragePath
  pub let ContractsBookPublicPath: PublicPath

  pub enum ReservationStatus: UInt8 {
    pub case notFound // was never made
    pub case expired // this means someone made it but their Emerald Pass expired
    pub case active // is currently active
  }

  pub resource interface ContractsBookPublic {
    pub fun getContracts(): [String]
  }

  pub resource ContractsBook: ContractsBookPublic {
    pub let contractNames: {String: Bool}

    pub fun addContract(contractName: String) {
      let me: Address = self.owner!.address
      self.contractNames[contractName] = true
      TouchstoneContracts.addUser(user: me)

      if EmeraldPass.isActive(user: me) {
        TouchstoneContracts.reserve(contractName: contractName, user: me)
      }
    }

    pub fun removeContract(contractName: String) {
      self.contractNames.remove(key: contractName)
    }

    pub fun getContracts(): [String] {
      return self.contractNames.keys
    }

    init() {
      self.contractNames = {}
    }
  }

  pub fun createContractsBook(): @ContractsBook {
    return <- create ContractsBook()
  }

  pub fun getUserTouchstoneCollections(user: Address): [String] {
    let collections = getAccount(user).getCapability(TouchstoneContracts.ContractsBookPublicPath)
                        .borrow<&ContractsBook{ContractsBookPublic}>()
                        ?? panic("This user has not set up a Collections yet.")

    return collections.getContracts()
  }

  pub resource GlobalContractsBook {
    pub let allUsers: {Address: Bool}
    pub let reservedContractNames: {String: Address}

    pub fun addUser(address: Address) {
      self.allUsers[address] = true
    }

    pub fun reserve(contractName: String, user: Address) {
      self.reservedContractNames[contractName] = user
    }

    pub fun getAllUsers(): [Address] {
      return self.allUsers.keys
    }

    pub fun getReservation(contractName: String): ReservationStatus {
      let reservedBy = self.reservedContractNames[contractName]
      if reservedBy == nil {
        return ReservationStatus.notFound
      } else if !EmeraldPass.isActive(user: reservedBy!) {
        return ReservationStatus.expired
      } else {
        return ReservationStatus.active
      }
    }

    init() {
      self.allUsers = {}
      self.reservedContractNames = {}
    }
  }

  access(contract) fun addUser(user: Address) {
    let globalContractsBook = self.account.borrow<&GlobalContractsBook>(from: /storage/TouchstoneGlobalContractsBook)!
    globalContractsBook.addUser(address: user)
  }

  access(contract) fun reserve(contractName: String, user: Address) {
    let globalContractsBook = self.account.borrow<&GlobalContractsBook>(from: /storage/TouchstoneGlobalContractsBook)!
    globalContractsBook.reserve(contractName: contractName, user: user)
  }

  pub fun getAllUsers(): [Address] {
    let globalContractsBook = self.account.borrow<&GlobalContractsBook>(from: /storage/TouchstoneGlobalContractsBook)!
    return globalContractsBook.getAllUsers()
  }

  pub fun getAllReservations(): {String: Address} {
    let globalContractsBook = self.account.borrow<&GlobalContractsBook>(from: /storage/TouchstoneGlobalContractsBook)!
    return globalContractsBook.reservedContractNames
  }

  pub fun getReservation(contractName: String): ReservationStatus {
    let globalContractsBook = self.account.borrow<&GlobalContractsBook>(from: /storage/TouchstoneGlobalContractsBook)!
    return globalContractsBook.getReservation(contractName: contractName)
  }

  init() {
    self.ContractsBookStoragePath = /storage/TouchstoneContractsBook
    self.ContractsBookPublicPath = /public/TouchstoneContractsBook

    self.account.save(<- create GlobalContractsBook(), to: /storage/TouchstoneGlobalContractsBook)
  }

}