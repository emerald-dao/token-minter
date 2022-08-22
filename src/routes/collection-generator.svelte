<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import {
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