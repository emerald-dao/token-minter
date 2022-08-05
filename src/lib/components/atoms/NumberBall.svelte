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
    width: 2rem;
    min-width: 2rem;
    height: 2rem;
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
</style>