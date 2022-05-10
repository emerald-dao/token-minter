import ExampleNFT from "../ExampleNFT.cdc"

pub fun main(serial: UInt64): ExampleNFT.Template? {
  return ExampleNFT.getTemplate(serial)
}