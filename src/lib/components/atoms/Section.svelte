<script>
  let sectionProps = {
    class:[$$restProps.class]
  }
</script>

<section {...sectionProps}>
  <slot/>
</section>

<style type="scss">
  section {
    padding-block: 6rem;
  }
  .padding-top {
    &-small {
      padding-top: 3.5rem;
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
      padding-bottom: 3.5rem;
    }
    &-large {
      padding-bottom: 7rem;
    }
    &-none {
      padding-bottom: 0;
    }
  }
</style>
