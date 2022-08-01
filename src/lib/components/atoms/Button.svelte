<script>
  let buttonProps = {
    class: [$$restProps.class],
  };
  export let href;
  export let disabled = false;
</script>

{#if href}
  <a
    {href}
    on:click
    on:mouseover
    on:focus
    on:mouseenter
    on:mouseleave
    {disabled}
    {...buttonProps}>
    <slot />
  </a>
{:else}
  <button
    on:click
    on:mouseover
    on:focus
    on:mouseenter
    on:mouseleave
    {disabled}
    {...buttonProps}>
    <slot />
  </button>
{/if}

<style type="scss">
  @use "../../styles/abstracts" as *;

  button,
  a {
    width: 100%;
    background: linear-gradient(
      to left,
      var(--clr-primary-main),
      var(--clr-accent-main)
    );
    color: var(--clr-font-text-button);
    font-family: var(--font-mono);
    padding: 0.3em 1.5em;
    border-radius: 0.2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.6em;
    border: none;

    @include mq(small) {
      width: fit-content;
    }
  }

  a {
    text-decoration: none;
  }

  .ghost {
    background: transparent;
    border: 2px solid var(--clr-accent-main);
    color: var(--clr-accent-main);
  }

  .small {
    font-size: var(--fs-200);
  }

  .medium {
    font-size: var(--fs-300);
  }

  .large {
    font-size: var(--fs-400);
  }

  .disabled {
    background: gray;
    cursor: not-allowed;
  }
  .disabled:hover {
    box-shadow: none;
  }

  button:hover {
    box-shadow: var(--clr-accent-soft) 4px 4px,
      var(--clr-accent-soft-t6) 8px 8px;
    transition: 0.4s;
  }
</style>
