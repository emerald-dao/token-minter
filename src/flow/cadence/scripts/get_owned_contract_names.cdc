import NonFungibleToken from "../../utility/NonFungibleToken.cdc"

pub fun main(user: Address): [String] {
  let account = getAuthAccount(user)
  let answer: [String] = []

  let iterationFunc = fun (path: StoragePath, type: Type): Bool {
    if type.isSubtype(of: Type<@NonFungibleToken.Collection>()) {
      let identifier = type.identifier
      let cutFront = identifier.slice(from: 19, upTo: identifier.length);
      let cutBack = cutFront.slice(from: 0, upTo: cutFront.length - 11)
      if !answer.contains(cutBack) {
        answer.append(cutBack)
      }
    }
    return true
  }

  account.forEachStored(iterationFunc)
  return answer
}