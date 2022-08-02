<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import {
    Section,
    Container,
    FlowConnect,
    Stack,
    TransparentCard,
    StepsButtons
  } from "$lib/components/atoms/index";
  import GeneratorNav from "$lib/components/sections/generator/GeneratorNav.svelte";
  import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";

  const steps = $stepsArray;
</script>

<Section class="padding-top-none padding-bottom-none">
  <div class="main-wrapper">
    <!-- Display generator if user has loggedIn with wallet -->
    {#if $user?.loggedIn}
      <Container class="width-large gutter-y-none" height="100%">
        <div class="main-layout">
          <div class="sidebar-container">
            <GeneratorNav bind:step={$activeStep} {steps} />
          </div>
          <div class="main-container">
            <TransparentCard padding="2.5rem" height="100%">
              <div class="component-container">
                <div class="component-wrapper">
                  <svelte:component
                    this={steps[$activeStep].component} />
                </div>
                <div class="step-buttons">
                  <StepsButtons step={steps[$activeStep]}/>
                </div>
              </div>
            </TransparentCard>
          </div>
        </div>
      </Container>

      <!-- If not connected, ask to connect wallet -->
    {:else}
      <div class="connection-wrapper">
        <Container>
          <TransparentCard accent={true} padding="4rem">
            <Stack>
              <p>Connect your Flow wallet to generate your collection</p>
              <FlowConnect />
            </Stack>
          </TransparentCard>
        </Container>
      </div>
    {/if}
  </div>
</Section>

<style type="scss">
  @use "../lib/styles/abstracts" as *;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

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

    .sidebar-container {
      height: 100%;

      @include mq(medium) {
        grid-area: sidebar;
      }
    }

    .main-container {
      grid-area: main;

      @include mq(medium) {
        height: 80vh;
      }

      .component-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

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
      }
    }
  }

  .connection-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
    }
  }
</style>
