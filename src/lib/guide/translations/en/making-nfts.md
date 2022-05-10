---
title: Making an NFT
author: Jacob Tucker
chapter: 3
language: en
---

# What goes into making an NFT?

In order to create an NFT, we must have the following components:

- **Smart Contracts:** The application that contains the rules to transact with the Blockchain.
- **Metadata:** A list of attributes generally in the format of key/value pairs. This provides the uniqueness of an NFT.
- **Asset Storage:** Off-chain storage that stores things like the image (.png) or video (.mp4) of the NFT.

Prior to jumping in, let’s view a diagram that provides a birds-eye view of the components that make up an NFT:

Diagram 2.1 The end to end process of deploying an NFT

## Smart Contracts

` `Smart contracts are pieces of code that act as “rulebooks” on the Blockchain. They govern what can and cannot be done by users interacting with them. In the context of NFTs, smart contracts define how NFTs get created, how NFTs keep track of their information, what you can do with them, and how people store them (just to name a few). Smart contracts allow us to create NFT Collections and “mint” (create) our NFTs.

The cool part is that because smart contracts live on the Blockchain, we have full public access to the history of NFTs at any time. Want to know who originally minted an NFT? Or who traded it? Or how much it sold for? All you have to do is check the historical records of the Blockchain.

` `On the [Flow Blockchain](https://www.onflow.org/), smart contracts are written in a computer programming language called Cadence, unlike Solidity which is used for smart contracts on the [Ethereum Blockchain](https://ethereum.org/en/). In Section 3, we’ll talk about the pros and cons of this language as opposed to others like Solidity.

Diagram 2.2 An example smart contract written in Cadence

## Metadata

Metadata is a term used to describe the details of the NFT or any asset. What does it look like (the difference between a Bored Ape and a CryptoPunk)? What attributes/traits are associated with it? What serial number is it? In the context of NFTs, Metadata represents what an NFT actually is. There are a bunch of fields like name, serial number, and description that personalise the NFT and make it unique. Across all NFTs, the only field they have in common is an “Id”, which is a unique identifier for each NFT. If two NFTs ever have the same Id, they become fungible. Here’s a list of common attributes:

- Id – a unique id of the NFT (different for every NFT, or it would be fungible)
- Name – Name of the NFT
- Description – a text description of the NFT
- Rarity – how rare the NFT is among similar NTFs across the Blockchain and within its same collection
- Serial – represents the number of the NFT relative to others in a similar set (ex. #3/40)
- Collection – the NFT collection it belongs to, created by the original author or artist
- Type – if it represents an in-game asset, for example, it can be used to help out the players, making it way more fun and meaningful to play Blockchain games
- Royalties – every time it's bought and sold, X amount of the sale goes to the person stored in this field.

` `…but there are infinitely more fields that can describe an NFT. It is entirely up to the creator of the NFT to describe what Metadata a NFT has, and it's up to the developer of the smart contract to properly store or reference that Metadata inside the NFT itself. The problem, though, is that it’s expensive to store data on the Blockchain. So we must be careful to only store smaller things on the Blockchain, and store heavier things elsewhere…

Diagram 2.3 List of Metadata on a Flunkz NFT

## Asset Storage

` `For smaller pieces of metadata like a name and description (which are just text), it is inexpensive to store it within the NFT itself. However, for things like images and videos, it becomes expensive very quickly to store on the Blockchain. To cope with this, we use other services like [IPFS](https://ipfs.io/), which is a decentralised storage network. We can upload our images to IPFS which will return to us a “CID” or “hash” (a bunch of random numbers and letters _ex. 89d89wy8989dwq89d9qwydqw89_) that references that data. Then, we can store that CID on the Blockchain in the NFT, which is super cheap, and retrieve the more expensive data using the CID whenever we want.

Diagram 2.4 Flow of data to/from IPFS
