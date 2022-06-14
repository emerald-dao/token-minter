<script>
	import Icon from "@iconify/svelte";
	import { Stack } from "$lib/components/atoms/index";
  import { siteTitle  } from '$lib/config/config';

  export let link = true
</script>

{#if link}
  <a href="/">
    <Stack direction="row" gap="15px">
      <Icon icon="ion:diamond-outline"/>
      <span>{siteTitle}</span>
    </Stack>
  </a>
{:else}
  <Stack direction="row" gap="15px">
    <Icon icon="ion:diamond-outline"/>
  </Stack>  
{/if}

<style type="scss">
  a {
    text-decoration: none;
  }
  span {
    font-family: var(--font-mono);
    font-size: 18px;
  }
</style>