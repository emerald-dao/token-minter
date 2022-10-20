<script>
  import MyNFTsv0 from "../versions/MyNFTsv0.svelte";
  import MyNFTsv1 from "../versions/MyNFTsv1.svelte";

  export let version;
  export let metadatas;
  export let primaryBuyers;
  export let addr;
  export let collectionPrice;
</script>

{#if version == 1}
  <MyNFTsv1 {metadatas} {primaryBuyers} {addr} {collectionPrice} />
{:else}
  <MyNFTsv0 {metadatas} {primaryBuyers} {addr} {collectionPrice} />
{/if}
