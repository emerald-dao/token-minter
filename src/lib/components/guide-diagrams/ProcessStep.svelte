<script>
  import { theme } from "$stores/ThemeStore"
  import { TransparentCard, AdaptableGrid, Ball, Stack } from "$atoms";
  
  let steps = [
    {
      name: "GUI (Front-end)",
      thumbnailURL: "/images/guide/ui-design.png",
      thumbnailURLWhite: "/images/guide/ui-design-white.png",
    },
    {
      name: "Smart Contract",
      thumbnailURL: "/images/guide/search.png",
      thumbnailURLWhite: "/images/guide/search-white.png",
    },
    {
      name: "Blockchain, NFT Metadata",
      thumbnailURL: "/images/guide/blockchain.png",
      thumbnailURLWhite: "/images/guide/blockchain-white.png",
    },
    {
      name: "Inter Planetary File System (IPFS), NFT Image",
      thumbnailURL: "/images/guide/database.png",
      thumbnailURLWhite: "/images/guide/database-white.png",
    }
  ];
</script>

 <AdaptableGrid minWidth="7em" gap="0.8em">
  {#each steps as step, i}
    <TransparentCard padding="0.8em">
      <Stack direction="column" align="center" gap="0.3em">
        <Ball>{i + 1}</Ball>
        <div class="image-container">
          {#if $theme === "dark"}
          <img src={step.thumbnailURLWhite} alt={step.name}>
          {:else}
          <img src={step.thumbnailURL} alt={step.name}>
          {/if} 
        </div>
        <span>{step.name}</span>
      </Stack>
    </TransparentCard>
  {/each}
</AdaptableGrid>

<style type="scss">
  .image-container {
    padding: 1em;
  }
  span {
    text-align: center;
    font-size: var(--fs-200);
  }
</style>