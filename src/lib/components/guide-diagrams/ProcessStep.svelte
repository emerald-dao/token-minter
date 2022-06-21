<script>
  import { NFTGuideGrid } from "$lib/components/atoms/index";
  
  let steps = [
    {
      name: "GUI (Front-end)",
      thumbnailURL: "/images/guide/crypto-kittie.png",
      backgroundColor: "#DFDFFA"
    },
    {
      name: "Smart Contract",
      thumbnailURL: "/images/guide/flunks.jpeg"
    },
    {
      name: "Blockchain, NFT Metadata",
      thumbnailURL: "/images/guide/float.png",
      backgroundColor: "#016775"
    },
    {
      name: "Inter Planetary File System (IPFS), NFT Image",
      thumbnailURL: "/images/guide/ballerz.png"
    }
  ];
</script>

<NFTGuideGrid
  NFTs={steps}
/>