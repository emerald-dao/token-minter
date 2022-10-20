<script>
  import { AdaptableGrid, CollectionStat } from "$atoms";
  export let collectionInfo;

  async function getStats(metadatas, purchasedIndexes, collectionPrice) {
    return new Promise(async (resolve, reject) => {
      let min = Number.POSITIVE_INFINITY;
      let highestBuy = 0.0;
      for (const index in metadatas) {
        const nftPrice = Number(metadatas[index].price ?? collectionPrice);
        if (!purchasedIndexes.includes(index) && nftPrice < min) {
          min = nftPrice;
        }
        if (purchasedIndexes.includes(index) && nftPrice > highestBuy) {
          highestBuy = nftPrice;
        }
      }
      resolve({
        floorPrice: min == Number.POSITIVE_INFINITY ? "N/A" : Number(min),
        highestBuy: Number(highestBuy),
        totalItems: metadatas.length,
        numPurchased: purchasedIndexes.length,
        available: metadatas.length - purchasedIndexes.length,
      });
    });
  }
</script>

{#await getStats(Object.values(collectionInfo.metadatas), Object.keys(collectionInfo.primaryBuyers), collectionInfo.price) then stats}
  <AdaptableGrid minWidth="5em" gap="1.2em">
    <CollectionStat title="total items" stat={stats.totalItems} />
    <CollectionStat title="purchased" stat={stats.numPurchased} />
    <CollectionStat title="available" stat={stats.available} />
    {#if !collectionInfo.lotteryBuying}
      <CollectionStat
        title="floor price"
        flowLogo={collectionInfo.paymentType === "$FLOW"}
        fusdLogo={collectionInfo.paymentType === "$FUSD"}
        stat={stats.floorPrice} />
      <CollectionStat
        title="highest buy"
        flowLogo={collectionInfo.paymentType === "$FLOW"}
        fusdLogo={collectionInfo.paymentType === "$FUSD"}
        stat={stats.highestBuy} />
    {:else}
      <CollectionStat
        title="price"
        flowLogo={collectionInfo.paymentType === "$FLOW"}
        fusdLogo={collectionInfo.paymentType === "$FUSD"}
        stat={Number(collectionInfo.price)} />
    {/if}
  </AdaptableGrid>
{/await}
