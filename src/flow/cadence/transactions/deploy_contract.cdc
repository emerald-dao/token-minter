import MintVerifiers from "../MintVerifiers.cdc"
import FLOAT from "../utility/FLOAT.cdc"

transaction(
  contractName: String,
  collectionName: String,
  description: String,
  imagePath: String,
  minting: Bool,
  price: UFix64,
  ipfsCID: String,
  // Singular FLOAT Verifier
  singularFLOAT: Bool,
  eventOwner: Address?,
  eventId: UInt64?,
  // Long Contract Code
  contractCode: String
) {
  prepare(deployer: AuthAccount) {
    log(contractCode)

    var mintVerifiers: [{MintVerifiers.IVerifier}] = []

    // Singular FLOAT Verifier
    if singularFLOAT {
      let floatEvents = getAccount(eventOwner!).getCapability(FLOAT.FLOATEventsPublicPath)
                          .borrow<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>()
                          ?? panic("Could not get the FLOAT Events Collection.")
      let floatEvent: &FLOAT.FLOATEvent{FLOAT.FLOATEventPublic} = floatEvents.borrowPublicEventRef(eventId: eventId!)
                          ?? panic("This FLOAT event owner does not have a FLOAT Event with that id.")
      mintVerifiers.append(MintVerifiers.SingularFLOAT(
        _eventOwner: eventOwner!,
        _eventId: eventId!,
        _eventImage: floatEvent.image,
        _eventName: floatEvent.name
      ))
    }

    deployer.contracts.add(
      name: contractName, 
      code: contractCode.decodeHex(),
      _name: collectionName,
      _description: description,
      _imagePath: imagePath,
      _minting: minting,
      _price: price,
      _ipfsCID: ipfsCID,
      _mintVerifiers: mintVerifiers
    )
  }
}