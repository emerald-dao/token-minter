<script>
  import { NFTCard } from "$atoms";
  import { resultCID } from "$stores/IPFSstore";
  import { csvStore } from "$stores/CollectionFilesStore";

  function getTemplates(assets, ipfsCID) {
    const response = assets.reduce((a, asset) => {
      a.push({
        name: asset.name,
        description: asset.description,
        thumbnail: `${ipfsCID}/${asset.thumbnail ?? asset.image}`,
      });
      return a;
    }, []);
    console.log(assets);
    return response;
  }

  let NFTs = getTemplates($csvStore.metadata, $resultCID);
</script>

<div class="main-wrapper">
  {#await NFTs}
    <p>...Getting NFTs</p>
  {:then NFTs}
    <div class="nfts">
      {#each NFTs as NFT}
        <NFTCard
          name={NFT.name}
          description={NFT.description}
          thumbnailURL={`https://nftstorage.link/ipfs/${NFT.thumbnail}`} />
      {/each}
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
