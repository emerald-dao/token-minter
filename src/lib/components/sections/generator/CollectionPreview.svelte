<script>
  import { Button, Stack, NFTCard } from "$lib/components/atoms/index";
  import { createForm } from 'felte';
  import { getTemplates } from "../../../../flow/actions.js";

  export let onNext = console.log("submit");
  export let onBack;

  let getNFTs = async () => Object.values(await getTemplates());
  let NFTs = getNFTs();
</script>

<div>
  {#await NFTs}
	  <p>...Getting NFTs</p>
  {:then NFTs}
    <div class="nfts-grid">
      {#each  NFTs as NFT }
        <NFTCard name={NFT.name} description={NFT.description} thumbnailURL={`https://ipfs.infura.io/ipfs/${NFT.thumbnail}`}/>
      {/each}
    </div>  
  {/await}
  <Stack direction="row">
    <Button type="button" class="small ghost" on:click="{() => onBack()}">
        Previous page
    </Button>
    <Button type="submit" class="small" on:click="{() => onNext()}">Next</Button>
  </Stack>
</div>

<style type="scss">
  .nfts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2em;
  }
</style>