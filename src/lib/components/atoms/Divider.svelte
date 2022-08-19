<script>
  export let space = "1rem";
  export let line = false;
  export let lineWidth = "0.5px";
  export let lineColor = "var(--clr-accent-main)";
</script>

<div class="space" style={`height: ${space}`}>
  {#if line}
    <div class="line" style={`height: ${lineWidth}; background-color: ${lineColor}`}/>
  {/if}
</div>

<style type="scss">
  .space {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .line {
      width: 100%;
    }
  }
</style>