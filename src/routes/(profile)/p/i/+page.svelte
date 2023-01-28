<script>
  import {
    getTouchstonePurchases,
    getOwnedContractNames,
    getAllContractNamesInBook,
  } from "$flow/actions";
  import { NFTCard, AdaptableGrid } from "$lib/components/atoms";
  import { user } from "$lib/stores/FlowStore.js";

  async function doStuff() {
    const ownedContractNames = await getOwnedContractNames($user.addr);
    console.log(ownedContractNames);
    const contractsInBook = await getAllContractNamesInBook();
    console.log(contractsInBook);
  }

  let waiting = doStuff();
</script>

<AdaptableGrid minWidth="10rem">
  {#await getTouchstonePurchases($user.addr) then purchases}
    {#each Object.values(purchases) as purchase}
      <NFTCard
        name={purchase.display.name}
        description={purchase.display.description}
        thumbnailURL={`https://nftstorage.link/ipfs/${purchase.display.thumbnail.cid}/${purchase.display.thumbnail.path}`}
        url={`/${purchase.contractName}/${purchase.metadataId}`}
        withLink={true}
        ownedByUser={true} />
    {/each}
  {/await}
</AdaptableGrid>
