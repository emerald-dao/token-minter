<script>
  let sectionProps = {
    class:[$$restProps.class]
  }

  export let background;
  export let height;
</script>

<section {...sectionProps} style={`background: ${background}; height: ${height}`}>
  <slot/>
</section>

<style type="scss">
  section {
    padding-block: 6rem;
  }
  .padding-top {
    &-small {
      padding-top: 2.5rem;
    }
    &-large {
      padding-top: 8rem;
    }
    &-none {
      padding-top: 0;
    }
  }
  .padding-bottom {
    &-small {
      padding-bottom: 2.5rem;
    }
    &-large {
      padding-bottom: 7rem;
    }
    &-none {
      padding-bottom: 0;
    }
  }
</style>
