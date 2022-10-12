<script>
  import { NFTCard } from ".";
  import { page } from "$app/stores";

  export let metadatas;
  export let primaryBuyers;
  export let addr;
  export let collectionPrice;

  let myNFTs = () => {
    if (!addr) return [];
    return Object.values(
      Object.fromEntries(
        Object.entries(metadatas).filter(
          ([key, value]) => primaryBuyers[key] == addr
        )
      )
    );
  };
</script>

{#each myNFTs() as NFT}
  <NFTCard
    thumbnailURL={NFT.thumbnail
      ? `https://nftstorage.link/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`
      : `https://nftstorage.link/ipfs/${NFT.image.cid}/${NFT.image.path}`}
    name={NFT.name}
    description={NFT.description}
    price={Number(NFT.price ?? collectionPrice)}
    url={`/discover/${$page.params.address}/${$page.params.collection}/${NFT.metadataId}`}
    withLink={true}
    buy={false}
    ownedByUser={true} />
{/each}
