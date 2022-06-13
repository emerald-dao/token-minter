<script>
  export let active = false;
  export let passed = false;
</script>

<div 
  class="step-number" 
  class:step-number-active={active} 
  class:step-number-passed={passed}
>
  <slot/>
</div>

<style type="scss">
  .step-number {
    color: var(--clr-font-text-soft);
    border: 1px var(--clr-font-text-soft) solid;
    width: 2rem;
    height: 2rem;
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    transition: 0.5s;
    cursor: pointer;
  }
  .step-number-passed {
    color: var(--clr-primary-main);
    border: 1px var(--clr-primary-main) solid;
    cursor: pointer;
  }
  .step-number-active {
    background-color: var(--clr-accent-hover);
    color: var(--clr-font-text);
    border: none;
    margin-left: 0.3rem;
  }
</style>