<script>
  import { TransparentCard } from '$lib/components/atoms/index';
  export let instructions;
</script>

<div class="instructions">
  <TransparentCard>
    <h5>Instructions</h5>
    <p>{instructions}</p>
  </TransparentCard>
</div>

<style type="scss">
  @use "../../styles/abstracts" as *;

  .instructions {
    display: none;
    height: 100%;

    @include mq(medium) {
      display: block;
      transition: 0.5s;
    }

    h5 {
      font-size: var(--fs-400);
      margin-top: 0;
      margin-bottom: 1em;
      font-weight: 500;
    }
    p {
      font-size: var(--fs-200);
    }
  }
</style>