<script>
  export let direction = "column";
  export let gap = "2rem";
  export let align = "center";
  export let justify = "space-between";
</script>

<div style="flex-direction: {direction}; gap: {gap}; align-items: {align}; justify-content={justify}">
  <slot/>
</div>

<style type="scss">
  div {
    display: flex;
  }
</style>