import ExampleNFT from "../ExampleNFT.cdc"
import Touchstone from "../Touchstone.cdc"

pub fun main(): Touchstone.CollectionInfo {
  return ExampleNFT.getCollectionInfo()
}