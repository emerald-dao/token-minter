<script>
  import { dappTitle } from "$lib/config/config";

  export let title;
</script>

<svelte:head>
	<title>{dappTitle} • {title}</title>
</svelte:head>