<script>
  import { page } from "$app/stores";
  import { getVersion } from "$flow/actions";
  import NFTPagev0 from "$lib/components/versions/NFTPagev0.svelte";
  import NFTPagev1 from "$lib/components/versions/NFTPagev1.svelte";
</script>

{#await getVersion($page.params.collection, $page.params.address) then version}
  {#if version == 0}
    <NFTPagev0 />
  {:else}
    <NFTPagev1 />
  {/if}
{/await}
