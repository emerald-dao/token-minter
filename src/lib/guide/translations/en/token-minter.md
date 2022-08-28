---
title: Collection Generator Guide
author: Jacob Tucker
index: 5
language: en
---

# Collection Generator Guide

There are 6 steps to creating your own NFT Collection using Touchstone. We will walk you through all of them in detail below.

## Collection Information

There are a few things you have to enter:
1. Collection Name - this is the general name of your collection (ex. FLOAT)
2. Price - the price of your NFTs in $FLOW
3. Description - a description of your collection
4. Image - an image for your collection

## Upload Assets

1. CSV File - this is a file that contains all of your attributes and associated metadata for each NFT. You must have a `name`, `description`, and `image` attribute.
2. Images Folder - a folder containing all of your images. The names of the images must match what is in the csv, for example `image1.png`.

*Click <a href="/assets/metadata.csv" download="">here</a> for an example CSV file, and <a href="/assets/images.zip" download="">here</a> for an example images folder. They show you how to match the metadata.*

3. IPFS Key - this is a key you can provide for us to upload your assets to IPFS. You can get this by going to https://nft.storage/login, clicking "API Keys" at the top, and creating your own key. 

## Collection Preview

Preview your collection and makes sure it looks correct.

## Contract Information

Select different options about your contract.

## Deploy Contract

Officially deploy your new contract to your account. You have full control over the contract after that point.

## Upload Metadata

This step will help guide you through uploading all your metadata to the contract. You must do this step in batches due to gas limits.
