<script>
  import { getTouchstonePurchases } from "$flow/actions";
  import { NFTCard, AdaptableGrid } from "$lib/components/atoms";
  import { user } from "$lib/stores/FlowStore.js";
</script>

<AdaptableGrid minWidth="10rem">
  {#await getTouchstonePurchases($user.addr) then purchases}
    {#each Object.values(purchases) as purchase}
      <NFTCard
        name={purchase.display.name}
        description={purchase.display.description}
        thumbnailURL={`https://ipfs.io/ipfs/${purchase.display.thumbnail.cid}/${purchase.display.thumbnail.path}`}
        url={`/discover/${purchase.contractAddress}/${purchase.contractName}/${purchase.metadataId}`}
        withLink={true}
      />
    {/each}
  {/await}
</AdaptableGrid>
