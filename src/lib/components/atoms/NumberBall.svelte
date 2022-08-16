<script>
  export let active = false;
  export let passed = false;
  export let size = "2rem";
</script>

<div 
  class="step-number" 
  class:step-number-active={active} 
  class:step-number-passed={passed}
  style={`width:${size}; min-width:${size}; height:${size}`}
>
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
</style>