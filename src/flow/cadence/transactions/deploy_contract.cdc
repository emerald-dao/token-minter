import MintVerifiers from "../MintVerifiers.cdc"
import FLOAT from "../utility/FLOAT.cdc"
import MetadataViews from "../utility/MetadataViews.cdc"
import TouchstoneContracts from "../TouchstoneContracts.cdc"
import FlowToken from "../utility/FlowToken.cdc"
import FungibleToken from "../utility/FungibleToken.cdc"

transaction(
  contractName: String,
  collectionName: String,
  description: String,
  imagePath: String,
  bannerImagePath: String?,
  price: UFix64,
  ipfsCID: String,
  // Socials
  discord: String?,
  twitter: String?,
  website: String?,
  // Contract Options
  minting: Bool,
  royalty: Bool,
  royaltyAddress: Address?,
  royaltyAmount: UFix64?,
  // Singular FLOAT Verifier
  singularFLOAT: Bool,
  // Has Emerald Pass Verifier
  hasEmeraldPass: Bool,
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
      mintVerifiers.append(MintVerifiers.SingularFLOAT(
        _eventOwner: eventOwner!,
        _eventId: eventId!
      ))
    }

    // Has Emerald Pass Verifier
    if hasEmeraldPass {
      mintVerifiers.append(MintVerifiers.HasEmeraldPass())
    }

    let socials = {
      "discord": discord == nil ? nil : MetadataViews.ExternalURL(discord!),
      "twitter": twitter == nil ? nil : MetadataViews.ExternalURL(twitter!),
      "website": website == nil ? nil : MetadataViews.ExternalURL(website!)
    }

    let royaltyInfo: MetadataViews.Royalty? = royalty ? MetadataViews.Royalty(
      recepient: getAccount(royaltyAddress!).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
      cut: royaltyAmount!,
      description: "This is a royalty cut on primary sales."
    ) : nil

    deployer.contracts.add(
      name: contractName, 
      code: contractCode.decodeHex(),
      _name: collectionName,
      _description: description,
      _imagePath: imagePath,
      _bannerImagePath: bannerImagePath,
      _minting: minting,
      _royalty: royaltyInfo,
      _price: price,
      _ipfsCID: ipfsCID,
      _socials: socials,
      _mintVerifiers: mintVerifiers
    )
  }
}