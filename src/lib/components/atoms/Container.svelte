<script>
  export let width = "medium"
  export let gutterX = true
  export let gutterY = true
</script>

<div class={width} class:gutter-x={gutterX} class:gutter-y={gutterY}>
  <slot/>
</div>

<style>
  div {
    margin-inline: auto;
  }

  .full {
    width: 90%;
  }
  
  .large {
    width: min(90%, 90rem)
  }

  .medium {
    width: min(90%, 60rem)
  }
  
  .small {
    width: min(90%, 40rem)
  }

  .gutter-y {
    padding-block: 1.5rem;
  }
</style>