import FLOAT from "./utility/FLOAT.cdc"


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

      let claimeeCollection = getAccount(minter).getCapability(FLOAT.FLOATCollectionPublicPath)
                                .borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>()
                                ?? panic("This account does not have a FLOAT Collection.")
      
      if claimeeCollection.ownedIdsFromEvent(eventId: self.eventId).length <= 0 {
        return "The minter does not own a FLOAT from the required event."
      }
      
      return nil
    }

    init(_eventOwner: Address, _eventId: UInt64, _eventCap: Capability<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>) {
      self.verifier = "Singular FLOAT"
      self.type = self.getType()
      self.eventOwner = _eventOwner
      self.eventId = _eventId
      self.eventCap = _eventCap
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