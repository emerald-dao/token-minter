import ExampleNFT from "../../ExampleNFT.cdc"

pub fun main(metadataId: UInt64): NFTInfo {
  return NFTInfo(metadataId: metadataId)
}

pub struct NFTInfo {
  pub let nftInfo: ExampleNFT.NFTMetadata?
  pub let serials: {UInt64: Bool}?

  init(metadataId: UInt64) {
    self.nftInfo = ExampleNFT.getNFTMetadata(metadataId)
    self.serials = ExampleNFT.getSerials(metadataId)
  }
}