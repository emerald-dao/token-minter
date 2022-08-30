<script>
  import { socialMedia } from '$lib/config/config'
  import Icon from "@iconify/svelte";
  import { Stack } from "$atoms";
</script>

<Stack direction="row">
  {#each socialMedia as media }
    <a href={media.url} target="_blank">
      <Icon icon={media.icon} width="1.5em" color="var(--clr-font-text)"/>
    </a>
  {/each}
</Stack>


<style type="scss">
  a {
    text-decoration: none;
  }
</style>
