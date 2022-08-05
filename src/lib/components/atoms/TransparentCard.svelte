<script>
  export let accent = false;
  export let error = false;
  export let height = "100%"
  export let padding = "1.4rem"
</script>

<div class:accent={accent} class:error={error} style={`height: ${height}; padding: ${padding}`}>
  <slot/>
</div>

<style type="scss">
  div {
    background-color: var(--clr-neutral-300-t9);
    border: 0.5px var(--clr-neutral-700-t8) solid;
    border-radius: 1rem;
    padding: 1.4rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  
  .accent {
    background-color: var(--clr-accent-soft-t8);
    border: 0.5px var(--clr-accent-main-t5) solid;
  }
</style>
