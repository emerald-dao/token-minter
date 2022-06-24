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
    color: var(--clr-accent-strong);
    border: 1px var(--clr-accent-strong) solid;
    width: 2rem;
    height: 2rem;
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    transition: 0.8s;
  }
  .step-number-passed {
    color: var(--clr-primary-main);
    border: 1px var(--clr-primary-main) solid;
  }
  .step-number-active {
    background-color: var(--clr-primary-main);
    color: var(--clr-font-text-inverse);
    border: none;
  }
</style>