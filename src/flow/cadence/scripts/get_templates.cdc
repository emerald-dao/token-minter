import ExampleNFT from "../ExampleNFT.cdc"

pub fun main(): {UInt64: ExampleNFT.Template} {
  return ExampleNFT.getTemplates()
}