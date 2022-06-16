---
title: Introduction to NFTs
author: Jacob Tucker
index: 2
language: en
---

<script>
  import { NFTGuideGrid, Diagram } from "$lib/components/atoms/index";
  
  let flowNFTs = [{
      name: "CryptoKitties",
      thumbnailURL: "/images/guide/crypto-kittie.png",
      backgroundColor: "#DFDFFA"
    },
    {
      name: "Flunks",
      thumbnailURL: "/images/guide/flunks.jpeg"
    },
    {
      name: "FLOAT",
      thumbnailURL: "/images/guide/float.png",
      backgroundColor: "#016775"
    },
    {
      name: "Ballerz",
      thumbnailURL: "/images/guide/ballerz.png"
    }
  ];

  let ethereumNFTs = [{
      name: "Bored Ape Yacht Club",
      thumbnailURL: "/images/guide/bored-ape.png"
    },
    {
      name: "Royal.io Music NFT",
      thumbnailURL: "/images/guide/royal-nft.jpg"
    },
    {
      name: "Poap NFT",
      thumbnailURL: "/images/guide/poap.png"
    },
    {
      name: "Sandbox Digital Land",
      thumbnailURL: "/images/guide/sandbox.jpeg"
    }
  ];

  let fungibleTokens = [{
      name: "Money",
      thumbnailURL: "/images/guide/money.jpeg"
    },
    {
      name: "Gold",
      thumbnailURL: "/images/guide/gold.jpeg"
    },
    {
      name: "Bitcoin",
      thumbnailURL: "/images/guide/bitcoin.jpeg"
    },
  ];

  let nonFungibleTokens = [{
      name: "Car",
      thumbnailURL: "/images/guide/car.jpeg",
      backgroundColor: "#DFDFFA"
    },
    {
      name: "Artwork",
      thumbnailURL: "/images/guide/artwork.jpg"
    },
    {
      name: "NFT",
      thumbnailURL: "/images/guide/crypto-kittie.png",
      backgroundColor: "#DFDFFA"
    },
  ];
</script>

# Introduction to Non-Fungible Tokens (NFTs)

## What is an NFT?

Non-Fungible tokens (or “NFTs”) are digital assets that represent real-world objects like music, art, and video game items. In today’s world, you will see most NFTs taking the form of digital art and collectibles of various kinds (i.e. [NBA TopShot](https://nbatopshot.com/) and [Crypto Kitties](https://www.cryptokitties.co/)). However, there’s a common misconception that digital art equals NFTs. This is untrue. More broadly, NFTs are unique, cannot be replicated, and are stored in something called the Blockchain, which is a large storage network that is publicly accessible and controlled by things called smart contracts. Naturally, these features allow them to be used for things, such as:

- **Art work** ([Versus Art](https://www.versus.auction/))
- **Collectibles** ([NBA TopShot](https://nbatopshot.com/) and [Crypto Kitties](https://www.cryptokitties.co/))
- **Music** ([Royal](https://royal.io/))
- **Video game assets** ([Axie Infinity](https://axieinfinity.com/))
- **Proof-Of-Attendance & Event Tickets** ([FLOAT](https://floats.city))

<Diagram name="List of popular NFTs" number="1.1">
  <NFTGuideGrid
    blockchain="Flow"
    logo="/images/guide/flow-logo.png"
    text="NFTs stored in the Flow Blockchain"
    NFTs={flowNFTs}
  />
  <NFTGuideGrid
    blockchain="Ethereum"
    logo="/images/guide/ethereum-logo.png"
    text="NFTs stored in the Ethereum Blockchain"
    NFTs={ethereumNFTs}
  />
</Diagram>

## Fungible vs. Non-Fungible

To further understand the “uniqueness” attribute of an NFT, we should learn what Fungible Tokens are. Fungible Tokens are assets that can be replaced by others of the same kind. For example, if I asked you to give me a $1 bill in exchange for one of my $1 bills, you wouldn’t care, because they represent the same thing. Most often, Fungible Tokens take the form of cryptocurrency, a digital currency that lives on the Blockchain (i.e [ETH](https://www.coindesk.com/price/ethereum/) and [FLOW](https://coinmarketcap.com/currencies/flow/)).

<Diagram name="Difference between Fungible and non-Fungible items or tokens" number="1.2">
  <NFTGuideGrid
    text="Fungible Items"
    description="They can be exchanged like for like. They have the same value."
    NFTs={fungibleTokens}
  />
  <NFTGuideGrid
    text="Non-Fungible Tokens"
    description="They cannot be exchanged like for like. They have unique value."
    NFTs={nonFungibleTokens}
  />
</Diagram>

## Example

When you go to visit the Mona Lisa in Paris, have you ever wondered why the painting is so special? It’s because it was painted by Leonardo da Vinci himself.

If you tried to duplicate the Mona Lisa and sell it, it would sell for _a lot less_ than the original.
The former has history and was painted by Leonardo da Vinci, while the other one has none of those attributes.
That is why art or digital collectibles are “non-fungible”; the value of the “same” art pieces significantly varies because they are intrinsically different (i.e. different artists, history varies).
