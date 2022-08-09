import TouchstoneContracts from "../TouchstoneContracts.cdc"

pub fun main(user: Address): [Contract] {
  let answer: [Contract] = []
  let contracts = getAccount(user).contracts
  let contractNames: [String] = TouchstoneContracts.getUserTouchstoneCollections(user: user)

  for contractName in contractNames {
    answer.append(Contract(
      _name: contractName,
      _code: String.encodeHex(contracts.get(name: contractName)!.code)
    ))
  }

  return answer
}

pub struct Contract {
  pub let name: String
  pub let code: String

  init(_name: String, _code: String) {
    self.name = _name 
    self.code = _code
  }
}