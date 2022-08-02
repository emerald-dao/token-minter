<script>
  import { NFTCard } from "$lib/components/atoms/index";
  import { resultCID } from "$lib/stores/generator/IPFSstore";
  import { csvMetadata } from "$lib/stores/generator/CsvStore.ts";

  function getTemplates(assets, ipfsCID) {
    const response = assets.reduce((a, asset) => {
      a.push({
        name: asset.name,
        description: asset.description,
        thumbnail: `${ipfsCID}/${asset.thumbnail}`,
      });
      return a;
    }, []);
    return response;
  }

  let NFTs = getTemplates($csvMetadata, $resultCID);
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
          thumbnailURL={`https://ipfs.infura.io/ipfs/${NFT.thumbnail}`} />
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
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
