<script>
  import { NFTCard } from ".";
  import { page } from "$app/stores";

  export let metadatas;
  export let primaryBuyers;
  export let addr;

  let myNFTs = () => {
    return Object.values(Object.fromEntries(Object.entries(metadatas).filter(([key, value]) => primaryBuyers[key] == addr)));
  }
</script>

{#each myNFTs() as NFT}
  <NFTCard
    thumbnailURL={`https://nftstorage.link/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`}
    name={NFT.name}
    description={NFT.description}
    price={Number(NFT.price).toFixed(3)}
    url={`/discover/${$page.params.address}/${$page.params.collection}/${NFT.metadataId}`}
    withLink={true}
     />
{/each}