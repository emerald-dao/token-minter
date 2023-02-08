<script>
  import {
    getOwnedNFTs,
    getTouchstonePurchases
  } from "$flow/actions";
  import { NFTCard, AdaptableGrid } from "$lib/components/atoms";
    import Button from "$lib/components/atoms/Button.svelte";
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
    {#each Object.values(purchases) as { metadata, isPack }}
      <NFTCard
        name={metadata.name}
        description={metadata.description}
        thumbnailURL={metadata.thumbnail ? `https://nftstorage.link/ipfs/${metadata.thumbnail.cid}/${metadata.thumbnail.path}` : `https://nftstorage.link/ipfs/${metadata.image.cid}/${metadata.image.path}`}
        url={`/${infos[index].contract_name}/${metadata.metadataId}`}
        withLink={true}
        ownedByUser={true} />
      {#if isPack}
        <Button>Open</Button>
      {/if}
    {/each}
  {/await}
</AdaptableGrid>

<style>
</style>