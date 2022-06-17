<script>
  import { NFTGuideGrid } from "$lib/components/atoms/index";

  export let money = "Money";
  export let gold = "Gold";
  export let car = "Car";
  export let artwork = "Artwork";

  export let fungibleDescription = "They can be exchanged like for like. They have the same value.";
  export let nonFungibleDescription = "They cannot be exchanged like for like. They have unique value.";

  let fungibleTokens = [
    {
      name: money,
      thumbnailURL: "/images/guide/money.jpeg"
    },
    {
      name: gold,
      thumbnailURL: "/images/guide/gold.jpeg"
    },
    {
      name: "Bitcoin",
      thumbnailURL: "/images/guide/bitcoin.jpeg"
    },
  ];

  let nonFungibleTokens = [
    {
      name: car,
      thumbnailURL: "/images/guide/car.jpeg",
      backgroundColor: "#DFDFFA"
    },
    {
      name: artwork,
      thumbnailURL: "/images/guide/artwork.jpg"
    },
    {
      name: "NFT",
      thumbnailURL: "/images/guide/crypto-kittie.png",
      backgroundColor: "#DFDFFA"
    },
  ];
</script>

<NFTGuideGrid
  text="Fungible Items"
  description={fungibleDescription}
  NFTs={fungibleTokens}
/>
<NFTGuideGrid
  text="Non-Fungible Tokens"
  description={nonFungibleDescription}
  NFTs={nonFungibleTokens}
/>