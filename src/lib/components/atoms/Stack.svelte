<script>
  export let direction = "column";
  export let gap = "2rem";
  export let align = "center";
</script>

<div style="flex-direction: {direction}; gap: {gap}; align-items: {align}">
  <slot/>
</div>

<style type="scss">
  div {
    display: flex;
  }
</style>