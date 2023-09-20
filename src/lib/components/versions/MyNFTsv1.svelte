<script>
  import { page } from "$app/stores";
  import { NFTCard } from "../atoms";

  export let metadatas;
  export let primaryBuyers;
  export let addr;
  export let collectionPrice;

  let myNFTs = () => {
    if (!addr) return [];
    let nfts = [];
    const metadataIds = Object.keys(primaryBuyers[addr]);
    for (const metadataId of metadataIds) {
      const metadata = metadatas[metadataId];
      for (const serial of primaryBuyers[addr][metadataId]) {
        nfts.push({ ...metadata, serial });
      }
    }
    return nfts;
  };
</script>

{#each myNFTs() as NFT}
  <NFTCard
    thumbnailURL={NFT.thumbnail
      ? `https://ipfs.io/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`
      : `https://ipfs.io/ipfs/${NFT.image.cid}/${NFT.image.path}`}
    name={NFT.name}
    description={NFT.description}
    price={Number(NFT.price ?? collectionPrice)}
    url={`/discover/${$page.params.address}/${$page.params.collection}/${NFT.metadataId}`}
    withLink={true}
    buy={false}
    ownedByUser={true}
    supply={NFT.supply}
    serial={NFT.serial}
  />
{/each}
