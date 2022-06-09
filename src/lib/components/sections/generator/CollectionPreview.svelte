<script>
  import { NFTCard, StepsButtons } from "$lib/components/atoms/index";
  import { getTemplates } from "../../../../flow/actions.js";

  export let onSubmitText;
  export let onSubmitAction;

  let getNFTs = async () => Object.values(await getTemplates());
  let NFTs = getNFTs();
</script>

<div class="main-wrapper">
  {#await NFTs}
    <p>...Getting NFTs</p>
  {:then NFTs}
    <div class="nfts">
      {#each  NFTs as NFT }
        <NFTCard name={NFT.name} description={NFT.description} thumbnailURL={`https://ipfs.infura.io/ipfs/${NFT.thumbnail}`}/>
      {/each}
    </div>  
  {:catch error}
    <p style="color: red">"We couldn't connect with the Flow Blockchain"</p>
  {/await}
  
  <StepsButtons onSubmitText={onSubmitText} onSubmitAction={onSubmitAction}/>
</div>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  .main-wrapper {
    height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
    width: 100%;

    .nfts {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      
      @include mq(small) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1em;
      }
    }
  }
</style>