import ExampleNFT from "../../ExampleNFT.cdc"

pub fun main(metadataId: UInt64): UInt64 {
  return ExampleNFT.nextMetadataId
}