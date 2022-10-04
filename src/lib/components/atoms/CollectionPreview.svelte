<script>
  import { NFTCard } from "$atoms";
  import { resultCID } from "$stores/IPFSstore";
  import { csvStore } from "$stores/CollectionFilesStore";
  import { collectionInfo } from "$stores/ContractStore.js";
  import IntersectionObserver from "svelte-intersection-observer";

  function getTemplates(assets, ipfsCID) {
    const response = assets.reduce((a, asset) => {
      a.push({
        name: asset.name,
        description: asset.description,
        thumbnail: `${ipfsCID}/${asset.thumbnail ?? asset.image}`,
        price: Number(asset.price ?? $collectionInfo.payment),
      });
      return a;
    }, []);
    console.log(assets);
    return response;
  }

  let nftsToDisplay = 50;
  let element;
  let intersecting;

  let NFTs = getTemplates($csvStore.metadata, $resultCID);
</script>

<div class="main-wrapper">
  {#await NFTs}
    <p>...Getting NFTs</p>
  {:then NFTs}
    <div class="nfts">
      {#each NFTs as NFT, i}
        {#if i < nftsToDisplay}
          <NFTCard
            name={NFT.name}
            description={NFT.description}
            thumbnailURL={`https://nftstorage.link/ipfs/${NFT.thumbnail}`}
            price={NFT.price}
            paymentType={$collectionInfo.paymentType} />
        {/if}
      {/each}
      <IntersectionObserver {element} bind:intersecting on:observe={() => {
        nftsToDisplay = nftsToDisplay + 20;
      }}>
        <div bind:this={element}/>
      </IntersectionObserver>
    </div>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
</div>

<style type="scss">
  @use "../../styles/abstracts" as *;

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
