<script>
  export let accent = false;
  export let height = "100%"
  export let padding = "1.4rem"
</script>

<div class:accent={accent} style={`height: ${height}; padding: ${padding}`}>
  <slot/>
</div>

<style type="scss">
  div {
    // TODO: make dynamic color
    background-color: hsla(0, 0%, 100%, 0.01);
    border: 0.5px hsla(0, 0%, 100%, 0.04) solid;
    border-radius: 1rem;
    padding: 1.4rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  
  .accent {
    // TODO: make dynamic color
    background-color: hsla(234, 67%, 40%, 0.3);
    border: 0.5px hsla(234, 67%, 40%, 0.5) solid;
  }
</style>
