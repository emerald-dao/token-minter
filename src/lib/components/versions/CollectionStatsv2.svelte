<script>
  import { AdaptableGrid, CollectionStat } from "$atoms";
  export let collectionInfo;
  console.log(collectionInfo);

  async function getStats(metadatas, purchasedIndexes, collectionPrice) {
    return new Promise(async (resolve, reject) => {
      let min = Number.POSITIVE_INFINITY;
      let highestBuy = 0.0;
      let totalItems = 0;
      let available = 0;
      for (const index in metadatas) {
        const nft = metadatas[index].metadata;
        const nftPrice = Number(nft.price ?? collectionPrice);
        const purchasedSerials = Object.keys(nft.purchasers);
        totalItems += Number(nft.supply);
        available += Number(nft.supply) - purchasedSerials.length;
        if (purchasedSerials.length != nft.supply && nftPrice < min) {
          min = nftPrice;
        }
        if (purchasedSerials.length > 0 && nftPrice > highestBuy) {
          highestBuy = nftPrice;
        }
      }
      resolve({
        floorPrice: min == Number.POSITIVE_INFINITY ? "N/A" : Number(min),
        highestBuy: Number(highestBuy),
        totalItems,
        numPurchased: totalItems - available,
        available,
      });
    });
  }
</script>

{#await getStats(Object.values(collectionInfo.nftMetadatas), Object.keys(collectionInfo.primaryBuyers), collectionInfo.price) then stats}
  <AdaptableGrid minWidth="5em" gap="1.2em">
    <CollectionStat title="total items" stat={stats.totalItems} />
    <CollectionStat title="purchased" stat={stats.numPurchased} />
    <CollectionStat title="available" stat={stats.available} />
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
  </AdaptableGrid>
{/await}
