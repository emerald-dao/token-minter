<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import {
    Section,
    Container,
    WalletConnectModal,
  } from "$lib/components/atoms/index";
  import { GeneratorNav, GeneratorStepLayout } from "$lib/components/sections/generator/index";
  import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";

  const steps = $stepsArray;
</script>

<Section class="padding-top-none padding-bottom-none" height="100%">
  <div class="main-wrapper">
    <Container class="width-large gutter-y-none" height="100%">
      <!-- Display generator if user has loggedIn with wallet -->
      {#if $user?.loggedIn}
      <div class="main-layout">
        <div class="sidebar-container">
          <GeneratorNav bind:step={$activeStep} {steps} />
        </div>
        <div class="main-container">
          <svelte:component
            this={steps[$activeStep].component} />
        </div>
      </div>
      <!-- If not connected, ask to connect wallet -->
      {:else}
        <WalletConnectModal/>
      {/if}
    </Container>
  </div>
</Section>

<style type="scss">
  @use "../lib/styles/abstracts" as *;

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
  }
  .sidebar-container {
    height: 100%;

    @include mq(medium) {
      grid-area: sidebar;
    }
  }
}
    
</style>
