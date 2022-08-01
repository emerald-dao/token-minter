import FLOAT from "./utility/FLOAT.cdc"


pub contract MintVerifiers {

  pub struct interface IVerifier {
		 pub let verifier: String
		 pub fun verify(_ params: {String: AnyStruct})
	}

  pub struct SingularFLOAT: IVerifier {
    pub let verifier: String
    pub let eventOwner: Address
    pub let eventId: UInt64
    pub let eventImage: String
    pub let eventName: String 

    pub fun verify(_ params: {String: AnyStruct}) {
      let minter: Address = params["minter"]! as! Address

      let claimeeCollection = getAccount(minter).getCapability(FLOAT.FLOATCollectionPublicPath)
                                .borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>()
                                ?? panic("This account does not have a FLOAT Collection.")
      
      assert(
        claimeeCollection.ownedIdsFromEvent(eventId: self.eventId).length > 0, 
        message: "The minter does not own a FLOAT from the required event."
      )
    }

    init(_eventOwner: Address, _eventId: UInt64, _eventImage: String, _eventName: String) {
      self.verifier = "Singular FLOAT"
      self.eventOwner = _eventOwner
      self.eventId = _eventId
      self.eventImage = _eventImage
      self.eventName = _eventName
    }
  }

}