<script>
  import { page } from "$app/stores";
  import { getVersion } from "$flow/actions";
  import NFTPagev0 from "$lib/components/versions/NFTPagev0.svelte";
  import NFTPagev1 from "$lib/components/versions/NFTPagev1.svelte";
  import NFTPagev2 from "$lib/components/versions/NFTPagev2.svelte";

  export let data;
  const { version, contractAddress } = data;
</script>

{#if version == 0}
  <NFTPagev0 {contractAddress} />
{:else if version == 1}
  <NFTPagev1 {contractAddress} />
{:else}
  <NFTPagev2 {contractAddress} />
{/if}
