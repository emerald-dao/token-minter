import ExampleNFT from "../../ExampleNFT.cdc"
import MetadataViews from "../../utility/MetadataViews.cdc"
import NonFungibleToken from "../../utility/NonFungibleToken.cdc"

pub fun main(user: Address): [&NonFungibleToken.NFT] {
    let collection = getAccount(user).getCapability(ExampleNFT.CollectionPublicPath)
                        .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                        ?? panic("User does not have a collection set up.")
    let answer: [&NonFungibleToken.NFT] = []
    for id in collection.getIDs() {
        let nft = collection.borrowNFT(id: id)
        answer.append(nft)
    }

    return answer
}