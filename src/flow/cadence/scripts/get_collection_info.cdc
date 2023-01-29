import ExampleNFT from "../../ExampleNFT.cdc"

pub fun main(): {String: AnyStruct} {
  return ExampleNFT.getCollectionInfo()
}