<script>
	import Icon from "@iconify/svelte";

  export let width = "1.1em"
  export let padding = "0.4em"
</script>

<div class="icon-wrapper" style={`padding: ${padding}`}>
  <Icon icon="ion:diamond" color="inherit" width={width}/>
</div>

<style type="scss">
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4em;
    border-radius: 9999px;
    background-color: var(--clr-accent-main);
    color: var(--clr-neutral-100);
    transition: 0.6s;
  }
  .icon-wrapper:hover {
    transform: rotate(15deg);
  }
</style>