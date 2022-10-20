---
title: Contract Generator Guide
author: Jacob Tucker
index: 5
language: en
---

# Contract Generator Guide

There are 5 steps to creating your own NFT Collection using Touchstone. We will walk you through all of them in detail below.

## Collection Information

There are a few things you have to enter:
1. Collection Name - this is the general name of your collection (ex. FLOAT)
2. Description - a description of your collection
3. Payment Type - select if you want to sell in $FLOW or $FUSD
4. Price - the price of your NFTs in $FLOW or $FUSD
5. Image - an image for your collection

## Upload Assets

There are 2 folders you need to upload in this step:

1. CSV File - this is a CSV file that contains all of your attributes and associated metadata for each NFT.
2. Images Folder - a folder containing all of your images. The names of the images must match what is in the csv, for example `image1.png`.

> If you're someone who likes examples instead of reading text, you can click <a href="/assets/metadata.csv" download="">here</a> for an example CSV file, and <a href="/assets/images.zip" download="">here</a> for an example images folder. They show you how to match the metadata.

### How to Make CSV File

Each of your NFTs is going to have metadata associated with it. For example:
- Name
- Description
- Image
- Rarity
- ... and more

Each of these items are called "attributes." The first line of your metadata CSV File should be the attributes that the NFTs will have.

On Touchstone, **you must** have a `name`, `description`, and `image` attribute. Additionally, you can optionally include:
- a `thumbnail` attribute if you want your NFT to display a less-intensive picture for easier loading.
- a `price` attribute if you want each NFT to have a different price.
- a `supply` attribute to automatically create X number of that NFT. If you give an NFT a supply, it will automatically duplicate that NFT X number of times, and serial all of them from 0 to (X-1), and group them under the same sale page. Just like NBATopShot does for a moment.

You can also include whatever other attributes you'd like, however you cannot use one of the 7 attribute names above (name, description, image, thumbnail, price, supply, or serial) for different purposes than what is described of them above.

Each row of the CSV File is an NFT.

For the `image` and `thumbnail` attribute, you must put the name of the file that is inside your Images folder. More on that in the next section...

Please see <a href="/assets/metadata.csv" download="">this file</a> for an example CSV file.

### How to Make the Images Folder

The images folder is actually quite simple. Just make a folder that contains all of the images of your different NFTs. It's totally fine if an image gets used more than once, so don't have duplicate images in that folder. 

You map an NFT to an image by putting its name in the CSV File described above. So if an image is named `nft_image1.png`, that is what you put under the NFT's image attribute.

Please see <a href="/assets/images.zip" download="">this file</a> for an example images folder.

### IPFS Key

The last thing you need is a key you can provide for us to upload your assets to IPFS. You can get this by going to https://nft.storage/login, clicking "API Keys" at the top, and creating your own key. 

## Contract Information

Select different options about your contract.

### Contract Options
- Minting starts active: If you check this box, then as soon as you deploy your contract, people can purchase your NFTs.
- Lottery buying (user purchases unknown NFT): If you select this box, then on the primary sales page we generate for you, users will not be able to select which NFT they want to buy. Instead, it will have 1 purchase button that shows a rotation of NFTs being displayed, and when the user purchases, it gives them a random NFT. 
- Royalty (primary sales): If you check this box, you can input an address and a number between `0` and `0.95`. This will automatically give a portion of your primary sales on Touchstone to the inputted address. For example, you could put the artist of your collection here to give them some royalty.

### Minting Verifiers
These are things that will gate purchases of your NFTs to people who meet certain requirements.

- Require a FLOAT: If you paste in a link to a FLOAT event, then only people with that FLOAT will be able to mint your NFTs.
- Require Emerald Pass subscription: If you check this box, then only people with Emerald Pass will be able to mint your NFTs.

## Collection Preview & Deploy

Preview your collection and makes sure it looks correct.

Then, officially deploy your new contract to your account. You have full control over the contract after that point.

## Upload Metadata

This step will help guide you through uploading all your metadata to the contract. You must do this step in batches due to gas limits.
