<script>
  import CollectionStatsv0 from "../../versions/CollectionStatsv0.svelte";
  import CollectionStatsv1 from "../../versions/CollectionStatsv1.svelte";

  export let version;
  export let collectionInfo;
</script>

{#if version == 1}
  <CollectionStatsv1 {collectionInfo} />
{:else}
  <CollectionStatsv0 {collectionInfo} />
{/if}
