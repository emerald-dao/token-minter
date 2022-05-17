<script>
  export let gap = 2;
  export let align = "center";
</script>

<div style="gap: {gap}rem; align-items: {align}">
  <slot/>
</div>

<style type="scss">
  div {
    display: flex;
    flex-direction: column;
  }
</style>