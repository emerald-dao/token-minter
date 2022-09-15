<script>
  import Icon from "@iconify/svelte";

  export let active = false;
  export let passed = false;
  export let accent = false;
  export let danger = false;
  export let size = "2rem";
  export let icon;
</script>

<div 
  class="step-number" 
  class:step-number-active={active} 
  class:step-number-passed={passed}
  class:danger={danger}
  class:accent={accent}
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
    color: var(--clr-accent-main);
  }
  .step-number-passed {
    background-color: var(--clr-primary-main-t8);
    color: var(--clr-primary-main-t4);
  }
  .step-number-active {
    background-color: var(--clr-primary-main);
    color: var(--clr-font-text-inverse);
  }
  .accent {
    background-color: var(--clr-accent-main);
    color: var(--clr-font-text-inverse);
  }
  .danger {
    background-color: rgba(255, 0, 0, 0.153);
    color: red;
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