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
      let eventCap = getAccount(eventOwner!).getCapability<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>(FLOAT.FLOATEventsPublicPath)
      if eventCap.borrow()?.borrowPublicEventRef(eventId: eventId!) == nil {
        panic("This is not a valid FLOAT Event.")
      }
      mintVerifiers.append(MintVerifiers.SingularFLOAT(
        _eventOwner: eventOwner!,
        _eventId: eventId!,
        _eventCap: eventCap
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