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
    color: var(--clr-accent-hard);
    border: 1px var(--clr-accent-hard) solid;
    width: 2rem;
    height: 2rem;
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    transition: 1.2s;
  }
  .step-number-passed {
    color: var(--clr-primary-main);
    border: 1px var(--clr-primary-main) solid;
    cursor: pointer;
  }
  .step-number-active {
    background-color: var(--clr-primary-main);
    color: var(--clr-font-text-inverse);
    border: none;
  }
</style>