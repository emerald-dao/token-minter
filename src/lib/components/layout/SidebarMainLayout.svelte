<script>
  import { Section, Container, TransparentCard } from "$lib/components/atoms/index";
</script>

<Section class="padding-top-none padding-bottom-none" height="100%">
  <div class="main-wrapper">
    <Container class="width-large gutter-y-none" height="100%">
      <div class="main-layout">
        <div class="sidebar-container">
          <TransparentCard accent={true} height={"fit-content"} paddingBlock="1.8rem">
            <slot name="sidebar"/>
          </TransparentCard>
        </div>
        <div class="main-container">
          <slot name="main"/>
        </div>
      </div>
    </Container>
  </div>
</Section>

<style type="scss">
  @use "../../styles/abstracts" as *;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    height: 100%;

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
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;

        @include mq(medium) {
          grid-area: sidebar;
        }
      }
    }
  }
</style>