import MintVerifiers from "../MintVerifiers.cdc"
import FLOAT from "../utility/FLOAT.cdc"
import MetadataViews from "../utility/MetadataViews.cdc"
import TouchstoneContracts from "../TouchstoneContracts.cdc"

transaction(
  contractName: String,
  collectionName: String,
  description: String,
  imagePath: String,
  bannerImagePath: String?,
  minting: Bool,
  price: UFix64,
  ipfsCID: String,
  // Socials
  discord: String?,
  twitter: String?,
  // Singular FLOAT Verifier
  singularFLOAT: Bool,
  eventOwner: Address?,
  eventId: UInt64?,
  // Long Contract Code
  contractCode: String
) {
  prepare(deployer: AuthAccount) {
    log(contractCode)

    if deployer.borrow<&TouchstoneContracts.ContractsBook>(from: TouchstoneContracts.ContractsBookStoragePath) == nil {
      deployer.save(<- TouchstoneContracts.createContractsBook(), to: TouchstoneContracts.ContractsBookStoragePath)
      deployer.link<&TouchstoneContracts.ContractsBook{TouchstoneContracts.ContractsBookPublic}>(TouchstoneContracts.ContractsBookPublicPath, target: TouchstoneContracts.ContractsBookStoragePath)
    }
    let contractsBook = deployer.borrow<&TouchstoneContracts.ContractsBook>(from: TouchstoneContracts.ContractsBookStoragePath)!
    contractsBook.addContract(contractName: contractName)

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

    let socials = {
      "discord": discord == nil ? nil : MetadataViews.ExternalURL(discord!),
      "twitter": twitter == nil ? nil : MetadataViews.ExternalURL(twitter!)
    }

    deployer.contracts.add(
      name: contractName, 
      code: contractCode.decodeHex(),
      _name: collectionName,
      _description: description,
      _imagePath: imagePath,
      _bannerImagePath: bannerImagePath,
      _minting: minting,
      _price: price,
      _ipfsCID: ipfsCID,
      _socials: socials,
      _mintVerifiers: mintVerifiers
    )
  }
}