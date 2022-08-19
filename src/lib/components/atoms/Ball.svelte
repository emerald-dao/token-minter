<script>
  import Icon from "@iconify/svelte";

  export let active = false;
  export let passed = false;
  export let size = "2rem";
  export let icon;
</script>

<div 
  class="step-number" 
  class:step-number-active={active} 
  class:step-number-passed={passed}
  style={`width:${size}; min-width:${size}; height:${size}`}
>
  {#if icon}
    <div class="icon-wrapper">
      <Icon icon={`${icon}`} width="100%" />
    </div>
  {/if}
  <slot/>
</div>

<style type="scss">
  .step-number {
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    transition: 0.8s;
    background-color: var(--clr-accent-main-t7);
    color: var(--clr-accent-main-t2);
  }
  .step-number-passed {
    background-color: var(--clr-primary-main-t7);
    color: var(--clr-primary-main-t6);
  }
  .step-number-active {
    background-color: var(--clr-primary-main);
    color: var(--clr-font-text-inverse);
  }
  .icon-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.4em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>