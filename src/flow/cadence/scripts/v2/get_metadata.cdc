import ExampleNFT from "../../ExampleNFT.cdc"

pub fun main(metadataId: UInt64): {ExampleNFT.IMetadata}? {
  return ExampleNFT.getMetadata(metadataId)
}