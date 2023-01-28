<script>
  import { NFTCard } from "$lib/components/atoms";
  import { page } from "$app/stores";
  import flowPriceStore from "$stores/FlowPriceStore";
  import { browser } from "$app/environment";

  export let collectionInfo;
  export let metadatas;
  export let maxPrice;
  export let minPrice;
  export let itemsToDisplay;
  export let available;
  export let nameFilter;
  export let contractAddress = $page.params.address;

  const [flowPrice, loading, error] = flowPriceStore();
</script>

{#each Object.values(metadatas) as { metadata }, i}
  <!-- Apply filters -->
  {#if (maxPrice === undefined || maxPrice >= Number(metadata.price ?? collectionInfo.price)) && (minPrice === undefined || minPrice <= Number(metadata.price ?? collectionInfo.price)) && i < itemsToDisplay}
    {#if $loading}
      Loading: {$loading}
    {:else if $error}
      Error: {$error}
    {:else if browser && !metadata.lockSale && (!available || metadata.numBought != metadata.supply) && (!nameFilter || metadata.name
          .toUpperCase()
          .includes(nameFilter.toUpperCase()))}
      <NFTCard
        thumbnailURL={metadata.thumbnail
          ? `https://nftstorage.link/ipfs/${metadata.thumbnail.cid}/${metadata.thumbnail.path}`
          : `https://nftstorage.link/ipfs/${metadata.image.cid}/${metadata.image.path}`}
        name={metadata.name}
        description={metadata.description}
        price={Number(metadata.price ?? collectionInfo.price)}
        buy={collectionInfo.version == 1
          ? !(Object.keys(metadata.purchasers).length == metadata.supply)
          : !Object.keys(collectionInfo.primaryBuyers).includes(
              metadata.metadataId
            )}
        url={`/${$page.params.collection}/${metadata.metadataId}`}
        withLink={true}
        flowPrice={$flowPrice.price}
        paymentType={collectionInfo.paymentType}
        supply={metadata.supply} />
    {/if}
  {/if}
{/each}
