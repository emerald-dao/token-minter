import MetadataViews from "../utility/MetadataViews.cdc"
import NFTCatalog from "../utility/NFTCatalog.cdc"
import ExampleNFT from "../ExampleNFT.cdc"

transaction(
    contractName: String,
    contractAddress: Address,
    publicLinkedTypeRestrictions: [String],
    privateLinkedTypeRestrictions: [String]
) {

    let nftCatalogProposalResourceRef: &NFTCatalog.NFTCatalogProposalManager
    
    prepare(acct: AuthAccount) {
        
        if acct.borrow<&NFTCatalog.NFTCatalogProposalManager>(from: NFTCatalog.ProposalManagerStoragePath) == nil {
             let proposalManager <- NFTCatalog.createNFTCatalogProposalManager()
             acct.save(<-proposalManager, to: NFTCatalog.ProposalManagerStoragePath)
             acct.link<&NFTCatalog.NFTCatalogProposalManager{NFTCatalog.NFTCatalogProposalManagerPublic}>(NFTCatalog.ProposalManagerPublicPath, target: NFTCatalog.ProposalManagerStoragePath)
        }

        self.nftCatalogProposalResourceRef = acct.borrow<&NFTCatalog.NFTCatalogProposalManager>(from: NFTCatalog.ProposalManagerStoragePath)!

    }
    
    execute {
      let pathIdentifier: String = contractName.concat("Collection_").concat(contractAddress.toString())
      let linkedTypeIdentifier: String = "A.".concat(contractAddress.toString().slice(from: 2, upTo: contractAddress.toString().length)).concat(".").concat(contractName).concat(".Collection")

      var privateLinkedType: Type? = nil
      if (privateLinkedTypeRestrictions.length == 0) {
          privateLinkedType = CompositeType(linkedTypeIdentifier)
      } else {
          privateLinkedType = RestrictedType(identifier: linkedTypeIdentifier, restrictions: privateLinkedTypeRestrictions)
      }
      
      let collectionData = NFTCatalog.NFTCollectionData(
          storagePath: StoragePath(identifier: pathIdentifier)!,
          publicPath: PublicPath(identifier: pathIdentifier)!,
          privatePath: PrivatePath(identifier: pathIdentifier)!,
          publicLinkedType: RestrictedType(identifier: linkedTypeIdentifier, restrictions: publicLinkedTypeRestrictions)!,
          privateLinkedType: privateLinkedType!
      )

      let squareMedia = MetadataViews.Media(
        file: ExampleNFT.getCollectionAttribute(key: "image") as! MetadataViews.IPFSFile,
        mediaType: "image"
      )
      
      // If a banner image exists, use it
      // Otherwise, default to the main square image
      var bannerMedia: MetadataViews.Media? = nil
      if let bannerImage = ExampleNFT.getOptionalCollectionAttribute(key: "bannerImage") as! MetadataViews.IPFSFile? {
        bannerMedia = MetadataViews.Media(
            file: bannerImage,
            mediaType: "image"
        )
      }
      
      let collectionDisplay = MetadataViews.NFTCollectionDisplay(
          name: ExampleNFT.getCollectionAttribute(key: "name") as! String,
          description: ExampleNFT.getCollectionAttribute(key: "description") as! String,
          externalURL: MetadataViews.ExternalURL("https://touchstone.city/discover/".concat(contractAddress.toString()).concat("/ExampleNFT")),
          squareImage: squareMedia,
          bannerImage: bannerMedia ?? squareMedia,
          socials: ExampleNFT.getCollectionAttribute(key: "socials") as! {String: MetadataViews.ExternalURL}
      )

      let nftTypeIdentifer: String = "A.".concat(contractAddress.toString().slice(from: 2, upTo: contractAddress.toString().length)).concat(".").concat(contractName).concat(".NFT")

      let catalogData = NFTCatalog.NFTCatalogMetadata(
          contractName: contractName,
          contractAddress: contractAddress,
          nftType: CompositeType(nftTypeIdentifer)!,
          collectionData: collectionData,
          collectionDisplay: collectionDisplay
      )

      self.nftCatalogProposalResourceRef.setCurrentProposalEntry(identifier: contractName)

      NFTCatalog.proposeNFTMetadata(collectionIdentifier: contractName, metadata: catalogData, message: "This proposal was created through Touchstone (https://touchstone.city/). For any questions, please reach out to us in the Emerald City Discord #touchstone channel (https://discord.gg/emeraldcity).", proposer: self.nftCatalogProposalResourceRef.owner!.address)

      self.nftCatalogProposalResourceRef.setCurrentProposalEntry(identifier: nil)
    }
}