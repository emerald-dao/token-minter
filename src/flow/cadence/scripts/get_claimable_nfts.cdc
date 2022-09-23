import ExampleNFT from "../ExampleNFT.cdc"

pub fun main(user: Address): {UInt64: ExampleNFT.NFTMetadata} {
  return ExampleNFT.getClaimableNFTs(user: user)
}