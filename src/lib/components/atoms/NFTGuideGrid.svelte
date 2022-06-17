<script>
  import { NFTCard, AdaptableGrid, Stack} from "./index";

  export let NFTs;
  export let blockchain;
  export let text;
  export let logo;
  export let description;
</script>

<div class="main-wrapper" class:flow={blockchain === "Flow"}>
  <Stack direction="column" align="flex-start" gap="1em">
    <div>
      <Stack direction="row" align="center" gap="1em">
        {#if logo}
          <img src={logo} alt={`${blockchain} logo`}>
        {/if}
        <p class="title">{text}</p>
      </Stack>
      {#if description}
        <p class="description">{description}</p>
      {/if}
    </div>
    <AdaptableGrid minWidth="7em" gap="0.8em">
      {#each NFTs as NFT}
        <NFTCard thumbnailURL={NFT.thumbnailURL} name={NFT.name} backgroundColor={NFT.backgroundColor}/>
      {/each}
    </AdaptableGrid>
  </Stack>
</div>

<style type="scss">
  .main-wrapper {
    background-color: var(--clr-neutral-300-t9);
    border: 1px var(--clr-neutral-300-t6) solid;
    padding: 1.5em;
    border-radius: 1.5em;
    margin-block: 1em;

    .title {
      margin-bottom: 0;
      font-weight: 500;
    }
    img {
      height: 40px;
      aspect-ratio: 1/1;
    }
    .description {
      font-size: var(--fs-200);
      margin-top: 0;
      color: var(--clr-font-text-soft)
    }
  }

  .flow {
    background-color: var(--clr-primary-soft-t9);
    border: 1px var(--clr-primary-main-t6) solid;
  }
</style>