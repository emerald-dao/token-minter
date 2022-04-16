import { config } from "@samatech/onflow-fcl-esm";

config({
  "accessNode.api": import.meta.env.VITE_ACCESS_NODE_API,
  "discovery.wallet": import.meta.env.VITE_DISCOVERY_WALLET,
  // "0xNonFungibleToken": import.meta.env.NONFUNGIBLETOKEN_ADDRESS,
  // "0xFungibleToken": import.meta.env.FUNGIBLETOKEN_ADDRESS,
  // "0xFlowToken": import.meta.env.FLOWTOKEN_ADDRESS
})