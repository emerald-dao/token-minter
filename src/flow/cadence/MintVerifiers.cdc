import FLOAT from "./utility/FLOAT.cdc"
import EmeraldPass from "./utility/EmeraldPass.cdc"

pub contract MintVerifiers {

  pub struct interface IVerifier {
		 pub let verifier: String
     pub let type: Type
     // A return value of nil means passing, otherwise
     // you return the error.
		 pub fun verify(_ params: {String: AnyStruct}): String?
	}

  pub struct SingularFLOAT: IVerifier {
    pub let verifier: String
    pub let type: Type
    pub let eventOwner: Address
    pub let eventId: UInt64
    pub let eventCap: Capability<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>

    pub fun verify(_ params: {String: AnyStruct}): String? {
      let minter: Address = params["minter"]! as! Address

      if let minterCollection = getAccount(minter).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
        if minterCollection.ownedIdsFromEvent(eventId: self.eventId).length <= 0 {
          return "The minter does not own a FLOAT from the required event."
        }
      } else {
        return "The minter does not have a FLOAT Collection set up."
      }
      
      return nil
    }

    init(_eventOwner: Address, _eventId: UInt64) {
      self.verifier = "Singular FLOAT"
      self.type = self.getType()
      self.eventOwner = _eventOwner
      self.eventId = _eventId
      self.eventCap = getAccount(_eventOwner).getCapability<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>(FLOAT.FLOATEventsPublicPath)
      assert(self.eventCap.check(), message: "This is not a valid FLOAT Event.")
    }
  }

  pub struct HasEmeraldPass: IVerifier {
    pub let verifier: String
    pub let type: Type

    pub fun verify(_ params: {String: AnyStruct}): String? {
      let minter: Address = params["minter"]! as! Address
      
      if !EmeraldPass.isActive(user: minter) {
        return "The minter does not have an active Emerald Pass subscription."
      }
      
      return nil
    }

    init() {
      self.verifier = "Has Emerald Pass"
      self.type = self.getType()
    }
  }

  pub fun checkPassing(verifiers: [{IVerifier}], params: {String: AnyStruct}): [Bool] {
    let answer: [Bool] = []
    for verifier in verifiers {
      answer.append(verifier.verify(params) == nil)
    }
    return answer
  }

}