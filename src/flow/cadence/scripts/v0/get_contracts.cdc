pub fun main(account: Address): [Contract] {
  let contracts = getAccount(account).contracts
  let answer: [Contract] = []
  
  for contractName in contracts.names {
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