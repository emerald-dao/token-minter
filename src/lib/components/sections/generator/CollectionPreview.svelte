<script>
  import { NFTCard, StepsButtons } from "$lib/components/atoms/index";
  import { getTemplates } from "../../../../flow/actions.js";

  export let onSubmitText;
  export let onSubmitAction;

  let getNFTs = async () => Object.values(await getTemplates());
  let NFTs = getNFTs();
</script>

<div class="main-wrapper">
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
  
  <StepsButtons onSubmitText={onSubmitText} onSubmitAction={onSubmitAction}/>
</div>

<style type="scss">
  .main-wrapper {
    height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;

    .nfts-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1em;
    }
  }
</style>