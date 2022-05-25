<script>
  import { Button, Stack, NFTCard } from "$lib/components/atoms/index";
  import { createForm } from 'felte';
  import { getTemplates } from "../../../../flow/actions.js";

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
  {:catch error}
	  <p style="color: red">"We couldn't connect with the Flow Blockchain"</p>
  {/await}
</div>

<style type="scss">
  .nfts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
  }
</style>