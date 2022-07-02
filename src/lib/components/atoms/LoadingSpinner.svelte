<script>
  import Icon from "@iconify/svelte";

  export let iconWidth = "2em";
  export let color;
</script>

<div class="rotating">
  <Icon icon="ion:refresh-circle" width={iconWidth} {color} />
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    justify-items: center;
  }

  @keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .rotating {
    animation: rotating 2s linear infinite;
  }
</style>
