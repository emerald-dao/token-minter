import ExampleNFT from "../../ExampleNFT.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"
import NonFungibleToken from "../../utility/NonFungibleToken.cdc"

pub fun main(user: Address): [{ExampleNFT.IMetadata}] {
    let collection = getAccount(user).getCapability(ExampleNFT.CollectionPublicPath)
                        .borrow<&ExampleNFT.Collection{ExampleNFT.CollectionPublic}>()
                        ?? panic("User does not have a collection set up.")
    let answer: [{ExampleNFT.IMetadata}] = []
    for id in collection.getIDs() {
        let nft: &ExampleNFT.NFT = collection.borrowWholeNFT(id: id)!
        answer.append(nft.getMetadata())
    }

    return answer
}