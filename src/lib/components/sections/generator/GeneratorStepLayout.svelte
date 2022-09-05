<script>
  import { TransparentCard } from "$atoms";
</script>

<div class="component-container">
  <TransparentCard height="100%" paddingInline="2rem" paddingBlock="0.8rem">
    <div class="component-wrapper">
      <slot name="main-content"/>
    </div>
  </TransparentCard>
  <div class="step-buttons">
    <slot name="buttons"/>
  </div>
</div>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  .component-container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 100% auto;

    .component-wrapper {
      overflow-y: auto;
      height: 100%;
      padding-inline: 2rem;
      padding-block: 1.8rem;
    }

    .step-buttons {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;

      @include mq(small) {
        margin-top: 2rem;
        position: static;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
      }
    }
  }
</style>