<script>
  import { page } from "$app/stores";
  import { getCollectionAddressFromName } from "$flow/actions";
  import CollectionPage from "$lib/components/sections/sale/CollectionPage.svelte";
</script>

{#await getCollectionAddressFromName($page.params.collection) then contractAddress}
  <CollectionPage {contractAddress} />
{/await}
