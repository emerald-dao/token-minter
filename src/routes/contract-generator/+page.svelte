<!-- Page that dynamically renders each step of the Contract Generation process -->
<script>
  import { user } from "$stores/FlowStore";
  import { WalletConnectModal, HtmlHead } from "$atoms";
  import { GeneratorNav } from "$components/sections/generator/index";
  import { activeStep } from "$stores/ActiveStepStore";
  import SidebarMainLayout from "$components/layout/SidebarMainLayout.svelte";
  import generatorSteps from "$lib/config/generatorSteps.js";
</script>

<HtmlHead title="Contract Generator" />

<!-- Display generator if user has loggedIn with wallet -->
{#if $user?.loggedIn}
  <SidebarMainLayout>
    <GeneratorNav
      slot="sidebar"
      bind:step={$activeStep.step}
      steps={generatorSteps} />
    <svelte:component
      this={generatorSteps[$activeStep.step].component}
      slot="main" />
  </SidebarMainLayout>
  <!-- If not connected, ask to connect wallet -->
{:else}
  <WalletConnectModal />
{/if}
