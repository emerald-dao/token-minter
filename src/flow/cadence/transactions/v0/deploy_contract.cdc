import MintVerifiers from "../../MintVerifiers.cdc"
import FLOAT from "../../utility/FLOAT.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"
import TouchstoneContracts from "../../TouchstoneContracts.cdc"
import FlowToken from "../../utility/FlowToken.cdc"
import FungibleToken from "../../utility/FungibleToken.cdc"
import FUSD from "../../utility/FUSD.cdc"

transaction(
  contractName: String, // TouchstoneExampleNFT
  collectionName: String, // Example NFT
  description: String,
  imagePath: String,
  bannerImagePath: String?,
  price: UFix64,
  paymentType: String,
  ipfsCID: String,
  // Socials
  socials: {String: String},
  // Contract Options
  minting: Bool,
  royalty: Bool,
  royaltyAddress: Address?,
  royaltyAmount: UFix64?,
  // Singular FLOAT Verifier
  singularFLOAT: Bool,
  eventOwner: Address?,
  eventId: UInt64?,
  eventURL: String?,
  // Has Emerald Pass Verifier
  hasEmeraldPass: Bool,
  // Long Contract Code
  contractCode: String
) {

  prepare(deployer: AuthAccount) {
    /**************************************************************************************/
    /********************************** Setup FUSD if not *********************************/
    /**************************************************************************************/
    if deployer.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
      deployer.save(<- FUSD.createEmptyVault(), to: /storage/fusdVault)
      deployer.link<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver, target: /storage/fusdVault)
      deployer.link<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance, target: /storage/fusdVault)
    }


    /**************************************************************************************/
    /************************************* DEPLOYMENT *************************************/
    /**************************************************************************************/

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
        _eventId: eventId!,
        _eventURL: eventURL!
      ))
    }

    // Has Emerald Pass Verifier
    if hasEmeraldPass {
      mintVerifiers.append(MintVerifiers.HasEmeraldPass())
    }


    var royaltyInfo: MetadataViews.Royalty? =  nil
    if (royalty) {
      if (paymentType == "$FLOW") {
        royaltyInfo = MetadataViews.Royalty(
          recepient: getAccount(royaltyAddress!).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
          cut: royaltyAmount!,
          description: "This is a royalty cut on primary sales."
        )
      } else if (paymentType == "$FUSD") {
        royaltyInfo = MetadataViews.Royalty(
          recepient: getAccount(royaltyAddress!).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver),
          cut: royaltyAmount!,
          description: "This is a royalty cut on primary sales."
        )
      }
    }

    let socialsStruct: {String: MetadataViews.ExternalURL} = {}
    for key in socials.keys {
        socialsStruct[key] =  MetadataViews.ExternalURL(socials[key]!)
    }

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
      _paymentType: paymentType,
      _ipfsCID: ipfsCID,
      _socials: socialsStruct,
      _mintVerifiers: mintVerifiers
    )
  }

}