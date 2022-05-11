<script>
  let buttonProps = {
    class:[$$restProps.class]
  }
  export let href;
</script>

{#if href}
  <a 
    {href}
    on:click
    on:mouseover
    on:focus
    on:mouseenter
    on:mouseleave
    {...buttonProps}
  >
    <slot/>
  </a>
{:else}
  <button 
    on:click
    on:mouseover
    on:focus
    on:mouseenter
    on:mouseleave
    {...buttonProps}
  >
    <slot/>
  </button>
{/if}

<style type="scss">
  button, a {
    width: fit-content;
    background: linear-gradient(to left, var(--clr-primary-main), var(--clr-accent-main));
    color: var(--clr-font-text-button);
    font-family: var(--font-mono);
    padding: 0.3em 1.5em;
    border-radius: .5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.6em;
    border: none;
  }

  .ghost {
    background: transparent;
    border: 2px solid var(--clr-primary-main);
    color: var(--clr-primary-main);
  }

  .small {
    font-size: var(--fs-300);
  }

  .medium {
    font-size: var(--fs-400);
  }

  .large {
    font-size: var(--fs-500);
  }
</style>