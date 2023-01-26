<script>
  import CollectionStatsv0 from "../../versions/CollectionStatsv0.svelte";
  import CollectionStatsv1 from "../../versions/CollectionStatsv1.svelte";
  import CollectionStatsv2 from "../../versions/CollectionStatsv2.svelte";

  export let version;
  export let collectionInfo;
</script>

{#if version == 2}
  <CollectionStatsv2 {collectionInfo} />
{:else if version == 1}
  <CollectionStatsv1 {collectionInfo} />
{:else}
  <CollectionStatsv0 {collectionInfo} />
{/if}
