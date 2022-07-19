import HatsNFT8 from 0x6c0d53c676256e8c
import MetadataViews from 0x631e88ae7f1d7c20

pub fun main(user: Address): [HatsNFT8.NFTMetadata] {
  let collection = getAccount(user).getCapability(HatsNFT8.CollectionPublicPath)
                      .borrow<&HatsNFT8.Collection{MetadataViews.ResolverCollection}>()!
  let answer: [HatsNFT8.NFTMetadata] = []

  let ids = collection.getIDs()

  for id in ids {
    let resolver = collection.borrowViewResolver(id: id)
    let serialView = resolver.resolveView(Type<MetadataViews.Serial>()) as! MetadataViews.Serial
    answer.append(HatsNFT8.getNFTMetadata(serialView.number)!)
  }

  return answer
}