<script>
  export let accent = false;
  export let error = false;
  export let height = "100%"
  export let padding = "1.4rem"
  export let paddingInline;
  export let paddingBlock;

  let cardProps = {
    class: [$$restProps.class],
  };
</script>

<div class:accent={accent} class:error={error} style={`height: ${height}; padding: ${padding}; padding-inline: ${paddingInline}; padding-block: ${paddingBlock}`} {...cardProps}>
  <slot/>
</div>

<style type="scss">
  div {
    background-color: var(--clr-accent-soft-t9);
    border-radius: 1rem;
    padding: 1.4rem;
    width: 100%;
  }
  .accent {
    background-color: var(--clr-accent-soft-t8);
  }
</style>
