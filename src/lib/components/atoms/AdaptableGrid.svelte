<script>
	export let gap = "5rem"
	export let minWidth = "25rem"
</script>

<div style="grid-gap: {gap}; grid-template-columns: repeat(auto-fill, minmax(min({minWidth}, 100%), 1fr));">
  <slot/>
</div>

<style type="scss">
  div {
		display: grid;
		width: 100%;
  }
</style>