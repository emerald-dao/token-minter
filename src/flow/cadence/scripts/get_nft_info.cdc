import ExampleNFT from "../ExampleNFT.cdc"

pub fun main(metadataId: UInt64): ExampleNFT.NFTMetadata? {
  return ExampleNFT.getNFTMetadata(metadataId)
}