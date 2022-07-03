pub fun main(account: Address): String {
  let account = getAccount(account)
  return String.encodeHex(account.contracts.get(name: "ChristmasNFT")!.code)
}