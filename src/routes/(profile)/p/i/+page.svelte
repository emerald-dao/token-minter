<script>
  import {
    getOwnedNFTs,
    getTouchstonePurchases
  } from "$flow/actions";
  import { NFTCard, AdaptableGrid } from "$lib/components/atoms";
  import Select from "$lib/components/atoms/Select.svelte";
  import { user } from "$lib/stores/FlowStore.js";

  export let data;
  const { infos } = data;
  console.log(infos);

  let index = 0;
</script>

<Select bind:value={index}>
  {#each infos as { contract_name }, i}
    <option value={i}>{contract_name}</option>
  {/each}
</Select>
<AdaptableGrid minWidth="10rem">
  {#await getOwnedNFTs($user.addr, infos[index].contract_name, infos[index].contract_address) then purchases}
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
