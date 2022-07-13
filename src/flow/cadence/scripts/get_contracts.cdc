pub fun main(account: Address): [String] {
  let contracts = getAccount(account).contracts
  let answer: [String] = []
  
  for contractName in contracts.names {
    answer.append(String.encodeHex(contracts.get(name: contractName)!.code))
  }

  return answer
}