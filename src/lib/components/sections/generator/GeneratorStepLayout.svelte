<div class="component-container">
  <div class="component-wrapper">
    <slot name="main-content"/>
  </div>
  <div class="step-buttons">
    <slot name="buttons"/>
  </div>
</div>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  .component-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .component-wrapper {
    overflow-y: auto;
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
</style>