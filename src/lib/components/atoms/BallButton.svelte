<script>
  import { Ball } from './index'

  export let active = false;
  export let clickable = false;
  export let passed = false;
  export let danger = false;
  export let number;
  export let icon;
  export let href;
</script>

{#if href}
  <a 
    href={href}
    class:li-active={active} 
    class:li-clickable={clickable}
    class:li-passed={passed}
    class:li-danger={danger}
  >
    <Ball active={active} passed={passed} icon={icon}>
      {#if number}
        {number}
      {/if}
    </Ball>
    <slot/>
  </a>
{:else}
  <!-- TODO: change li for better html element -->
  <li 
    class:li-active={active} 
    class:li-clickable={clickable}
    class:li-passed={passed}
    class:li-danger={danger}
    on:click
  >
    <Ball active={active} passed={passed} icon={icon}>
      {#if number}
        {number}
      {/if}
    </Ball>
    <slot/>
  </li>
{/if}

<style type="scss">
  @use "../../styles/abstracts" as *;
  
  li, a {
    display: flex;
    font-weight: 500;
    transition: 0.6s;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    border-radius: 0.5em;
    letter-spacing: 0.05em;
    font-family: var(--font-main);
    text-decoration: none;
    transition: 0.4s;
    width: 100%;
    color: var(--clr-accent-main-t1);
    padding-block: 0.6em;
    transition: 1s;
    font-size: var(--fs-200);
    
    @include mq(medium) {
      display: flex;
      font-size: var(--fs-300);
    }
  }
  a:hover {
    text-decoration: none;
    color: currentColor;
  }

  .li-active {
    font-size: var(--fs-300);
    color: var(--clr-primary-main);
  }
  .li-clickable {
    cursor: pointer;
  }
  .li-passed {
    color: var(--clr-primary-main-t5);
  }
  .li-danger {
    color: red;
  }
</style>