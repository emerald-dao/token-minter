<script>
  import Icon from "@iconify/svelte";

  export let href = false;
  export let name = "verifier";
  export let checked = true;
  export let tooltip = false;
</script>

<div data-tooltip={tooltip} class:checked={checked}>
  {#if checked}
    <Icon icon="ion:checkmark-circle" color="var(--clr-primary-main)"/>
    <span>{name}</span>
  {:else}
    {#if href}
      <a href={href} target="_blank">
        <Icon icon="ion:close-circle" color="hsl(0,100%,50%,0.5)"/>
        <span>{name}</span>
      </a>
    {:else}
      <Icon icon="ion:close-circle" color="hsl(0,100%,50%,0.5)"/>
      <span>{name}</span>
    {/if}
  {/if}
</div>

<style type="scss">
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2em;
    color: var(--clr-accent-main-t4);
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2em;
    color: var(--clr-accent-main-t4);
    transition: 0.4s;
  }
  a:hover {
    color: var(--clr-accent-main-t3)
  }

  .checked {
    color: var(--clr-accent-main);
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
  }
</style>
