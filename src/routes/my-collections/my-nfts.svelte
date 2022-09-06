<script>
  import { getTouchstonePurchases } from "$flow/actions";
  import { NFTCard } from "$lib/components/atoms";
  import { user } from "$lib/stores/FlowStore.js";
</script>

{#await getTouchstonePurchases($user.addr) then purchases}
  {#each Object.values(purchases) as purchase}
    <NFTCard
      name={purchase.display.name}
      description={purchase.display.description}
      thumbnailURL={`https://nftstorage.link/ipfs/${purchase.display.thumbnail.cid}/${purchase.display.thumbnail.path}`}
      url={`https://touchstone.city/discover/${purchase.contractAddress}/${purchase.contractName}/${purchase.metadataId}`}
      withLink={true} />
  {/each}
{/await}
