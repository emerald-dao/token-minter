<script>
  import { NFTGuideGrid } from "$lib/components/atoms/index";
  
  export let flowText = "NFTs stored in the Flow Blockchain";
  export let ethereumText = "NFTs stored in the Ethereum Blockchain";

  let flowNFTs = [
    {
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

  let ethereumNFTs = [
    {
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
</script>

<NFTGuideGrid
  blockchain="Flow"
  logo="/images/guide/flow-logo.png"
  text={flowText}
  NFTs={flowNFTs}
/>
<NFTGuideGrid
  blockchain="Ethereum"
  logo="/images/guide/ethereum-logo.png"
  text={ethereumText}
  NFTs={ethereumNFTs}
/>
