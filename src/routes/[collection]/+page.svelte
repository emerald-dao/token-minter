<script>
  import CollectionPage from "$lib/components/sections/sale/CollectionPage.svelte";

  export let data;
</script>

<CollectionPage contractAddress={data.contractAddress} />
