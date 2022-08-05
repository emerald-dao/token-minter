<script>
  import Icon from "@iconify/svelte";
  import { LoadingSpinner } from "$lib/components/atoms/index"; 

  let buttonProps = {
    class: [$$restProps.class],
  };
  export let href;
  export let disabled = false;
  export let download = false;
  export let rightIcon;
  export let leftIcon;
  export let state = "active";
  export let form;
</script>

{#if href}
  {#if download}
    <a
      {href}
      on:click
      on:mouseover
      on:focus
      on:mouseenter
      on:mouseleave
      {disabled}
      {download}
      {...buttonProps}>
      {#if leftIcon}
        <Icon
          icon={`ion:${leftIcon}`}
          width="1.5em" />
      {/if}   
      <slot />
      {#if rightIcon}
        <Icon
          icon={`ion:${rightIcon}`}
          width="1.5em" />
      {/if}   
    </a>
  {:else}
    <a
      {href}
      on:click
      on:mouseover
      on:focus
      on:mouseenter
      on:mouseleave
      {disabled}
      {...buttonProps}>
      {#if leftIcon}
        <Icon
          icon={`ion:${leftIcon}`}
          width="1.5em" />
      {/if}   
      <slot />
      {#if rightIcon}
        <Icon
          icon={`ion:${rightIcon}`}
          width="1.5em" />
      {/if}   
    </a>
  {/if}   
{:else}
  <button
    on:click
    on:mouseover
    on:focus
    on:mouseenter
    on:mouseleave
    disabled={disabled || state === "loading"}
    {form}
    {...buttonProps}>
    {#if state === "loading"}
      <LoadingSpinner
        color="var(--clr-font-text-inverse)"
        iconWidth="1.5em" />
    {/if} 
    {#if leftIcon && state != "loading"}
      <Icon
        icon={`ion:${leftIcon}`}
        width="1.5em" />
    {/if}
    <slot />
    {#if rightIcon && state != "loading"}
      <Icon
        icon={`ion:${rightIcon}`}
        width="1.5em" />
    {/if}
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
    padding: 0.4em 1.5em;
    border-radius: 0.4em;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    justify-content: center;
    gap: 0.7em;
    border: none;

    @include mq(small) {
      width: fit-content;
    }
  }

  a {
    text-decoration: none;
  }
  a:hover {
    color: inherit;
  }

  .ghost {
    background: transparent;
    border: 2px solid var(--clr-accent-main);
    color: var(--clr-accent-main);
  }
  .ghost:hover {
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

  .loading {
    background: linear-gradient(
      to left,
      var(--clr-primary-main-t3),
      var(--clr-accent-main-t3)
    );
    cursor: not-allowed;
  }

  .done {
    background: linear-gradient(
      to left,
      var(--clr-primary-main-t6),
      var(--clr-accent-main-t6)
    );
    cursor: not-allowed;
  }

  .waiting {
    background: linear-gradient(
      to left,
      var(--clr-primary-main-t5),
      var(--clr-accent-main-t5)
    );
    cursor: not-allowed;
  }

  .disabled {
    background: gray;
    cursor: not-allowed;
  }
  .disabled:hover {
    box-shadow: none;
  }

  .no-shadow:hover {
    box-shadow: none;
  }

  button:hover, a:hover {
    box-shadow: var(--clr-accent-soft) 4px 4px,
      var(--clr-accent-soft-t6) 8px 8px;
    transition: 0.4s;
    color: var(--clr-font-text-inverse);
  }
</style>
