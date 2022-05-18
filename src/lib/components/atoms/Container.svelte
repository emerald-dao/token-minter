<script>
  let containerProps = {
    class:[$$restProps.class]
  }
</script>

<div {...containerProps}>
  <slot/>
</div>

<style type="scss">
  div {
    margin-inline: auto;
    width: min(90%, 65rem);
    padding-block: 1.5rem;
  }

  .width {
    &-full {
      width: 90%;
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