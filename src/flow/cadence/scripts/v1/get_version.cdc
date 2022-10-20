import ExampleNFT from "../../ExampleNFT.cdc"

pub fun main(): AnyStruct {
  return ExampleNFT.getCollectionInfo()["version"] ?? 0
}