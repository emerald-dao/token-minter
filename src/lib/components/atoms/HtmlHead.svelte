<script>
  import { dappTitle } from "$lib/config/config";
  import { theme } from "$lib/stores/ThemeStore";

  export let title;
</script>

<svelte:head>
	<title>{dappTitle} • {title}</title>
  {#if $theme === "dark"}
    <link rel="icon" href="/favicon-black.png" />
  {:else}
    <link rel="icon" href="/favicon-white.png" />
  {/if}
</svelte:head>
