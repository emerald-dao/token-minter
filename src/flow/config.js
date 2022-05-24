import { config } from '@onflow/fcl';

config({
  "app.detail.title": "Token Minter", // Shows user what dapp is trying to connect
  "app.detail.icon": "https://fcl-discovery.onflow.org/images/blocto.png", // shows image to the user to display your dapp brand
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "0xExampleNFT": "0x86d486feb7683e02"
})