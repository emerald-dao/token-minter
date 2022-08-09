<script>
  export let address = "";
</script>

<span class="address">
  <slot/> 
  {address}
</span>

<style type="scss">
  .address {
    color: var(--clr-accent-main);
    background-color: var(--clr-accent-main-t8);
    font-size: var(--fs-200);
    font-weight: 500;
    padding: 0.2em 0.9em;
    border-radius: 0.8rem;
    width: fit-content;
    margin-bottom: 1em;
  }
</style>