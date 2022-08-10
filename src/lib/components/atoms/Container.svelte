<script>
  let containerProps = {
    class:[$$restProps.class]
  }

  export let height = "auto";
  export let background;
</script>

<div {...containerProps} style="height: {height}; background: {background}">
  <slot/>
</div>

<style type="scss">
  div {
    margin-inline: auto;
    width: min(90%, 65rem);
    padding-block: 1.5rem;
    position: relative;
  }

  .width {
    &-full {
      width: 90%;
    }
    &-x-large {
      width: min(90%, 85rem);
    }
    &-large {
      width: min(90%, 75rem);
    }
    &-small {
      width: min(90%, 50rem);
    }
  }

  .gutter-y {
    &-none {
      padding-block: 0;
    }
  }
</style>