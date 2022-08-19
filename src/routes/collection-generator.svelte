<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import {
    Section,
    Container,
    WalletConnectModal,
  } from "$lib/components/atoms/index";
  import { GeneratorNav } from "$lib/components/sections/generator/index";
  import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";
  import SidebarMainLayout from "$lib/components/layout/SidebarMainLayout.svelte";

  const steps = $stepsArray;
</script>

<Section class="padding-top-none padding-bottom-none" height="100%">
  <div class="main-wrapper">
    <Container class="width-large gutter-y-none" height="100%">
      <!-- Display generator if user has loggedIn with wallet -->
      {#if $user?.loggedIn}
      <SidebarMainLayout>
        <GeneratorNav slot="sidebar" bind:step={$activeStep} {steps} />
        <svelte:component
          slot="main"
          this={steps[$activeStep].component} />
      </SidebarMainLayout>
      <!-- If not connected, ask to connect wallet -->
      {:else}
        <WalletConnectModal/>
      {/if}
    </Container>
  </div>
</Section>

<style type="scss">
  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    height: 100%;
  }
</style>
