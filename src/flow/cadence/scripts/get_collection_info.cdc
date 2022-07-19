import ExampleNFT from "../ExampleNFT.cdc"

pub fun main(): ExampleNFT.CollectionInfo {
  return ExampleNFT.getCollectionInfo()
}