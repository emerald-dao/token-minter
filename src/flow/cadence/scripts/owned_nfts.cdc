import HatsNFT10 from 0x6c0d53c676256e8c
import MetadataViews from 0x631e88ae7f1d7c20

pub fun main(user: Address): [HatsNFT10.NFTMetadata] {
  let collection = getAccount(user).getCapability(HatsNFT10.CollectionPublicPath)
                      .borrow<&HatsNFT10.Collection{MetadataViews.ResolverCollection}>()!
  let answer: [HatsNFT10.NFTMetadata] = []

  let ids = collection.getIDs()

  for id in ids {
    let resolver = collection.borrowViewResolver(id: id)
    let serialView = resolver.resolveView(Type<MetadataViews.Serial>())! as! MetadataViews.Serial
    answer.append(HatsNFT10.getNFTMetadata(serialView.number)!)
  }

  return answer
}