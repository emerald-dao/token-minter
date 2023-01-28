<script>
  import flowPriceStore from "$stores/FlowPriceStore";
  import { getCollectionInfo } from "$flow/actions";
  import { HtmlHead, TransactionModal } from "$atoms";
  import { page } from "$app/stores";
  import CollectionPagev0 from "$lib/components/versions/CollectionPagev0.svelte";
  import CollectionPagev2 from "$lib/components/versions/CollectionPagev2.svelte";

  export let contractAddress;
</script>

<HtmlHead title="Discover" />
<TransactionModal />

{#await getCollectionInfo($page.params.collection, contractAddress) then collectionInfo}
  {#if collectionInfo.version == 1 || collectionInfo.version == 0}
    <CollectionPagev0 {collectionInfo} {contractAddress} />
  {:else}
    <CollectionPagev2 {collectionInfo} {contractAddress} />
  {/if}
{/await}
