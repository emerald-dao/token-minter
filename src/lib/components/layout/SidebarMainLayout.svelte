<div class="main-layout">
  <div class="sidebar-container">
    <slot name="sidebar"/>
  </div>
  <div class="main-container">
    <slot name="main"/>
  </div>
</div>

<style type="scss">
  @use "../../styles/abstracts" as *;

  .main-layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include mq(medium) {
      display: grid;
      grid-template-columns: 270px 1fr;
      gap: 2rem;
      margin-bottom: 1rem;
      height: 100%;
      grid-template-areas: "sidebar main";
    }

    .main-container {
      grid-area: main;

      @include mq(medium) {
        height: 70vh;
      }
    }

    .sidebar-container {
      height: 100%;

      @include mq(medium) {
        grid-area: sidebar;
      }
    }
  }
</style>