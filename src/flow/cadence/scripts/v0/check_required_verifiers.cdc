import ExampleNFT from "../../ExampleNFT.cdc"
import MintVerifiers from "../../MintVerifiers.cdc"

pub fun main(potentialMinter: Address): [VerifierInfo] {
  let answer: [VerifierInfo] = []
  let verifiers = ExampleNFT.getMintVerifiers()

  let checks = MintVerifiers.checkPassing(
    verifiers: verifiers, 
    params: {"minter": potentialMinter}
  )

  var i = 0
  while i < verifiers.length {
    let verifier = verifiers[i]
    var metadata: {String: AnyStruct} = {}

    switch verifier.type {
      case Type<MintVerifiers.SingularFLOAT>():
        let specific = verifier as! MintVerifiers.SingularFLOAT
        let event = specific.eventCap.borrow()!.borrowPublicEventRef(eventId: specific.eventId)!
        metadata = {"name": "Own FLOAT", "description": "You must own a specific FLOAT to mint from this collection.", "eventImage": event.image, "eventName": event.name, "eventId": specific.eventId, "eventOwner": specific.eventOwner, "url": specific.eventURL}
      case Type<MintVerifiers.HasEmeraldPass>():
        metadata = {"name": "Active Emerald Pass", "description": "You must have an active Emerald Pass subscription to mint from this collection."}
    }

    answer.append(VerifierInfo(
      verifier: verifier.verifier,
      type: verifier.type,
      passing: checks[i],
      metadata: metadata
    ))
    i = i + 1
  }

  return answer
}

pub struct VerifierInfo {
  pub let verifier: String
  pub let type: Type
  pub let passing: Bool
  pub let metadata: {String: AnyStruct} 

  init(verifier: String, type: Type, passing: Bool, metadata: {String: AnyStruct}) {
    self.verifier = verifier
    self.type = type
    self.passing = passing
    self.metadata = metadata
  }
}