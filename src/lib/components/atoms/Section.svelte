<script>
  export let paddingTop = true
  export let paddingBottom = true
  export let padding = "medium"
</script>

<section class={padding} class:padding-top={paddingTop} class:padding-bottom={paddingBottom}>
  <slot/>
</section>

<style type="scss">
  .padding-top.small {
    padding-top: 3.5rem;
  }
  .padding-top.medium {
    padding-top: 4rem;
  }
  .padding-top.large {
    padding-top: 4.5rem;
  }

  .padding-bottom.small {
    padding-bottom: 3.5rem;
  }

  .padding-bottom.medium {
    padding-bottom: 4rem;
  }

  .padding-bottom.large {
    padding-bottom: 4.5rem;
  }
</style>
