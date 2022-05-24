<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import { Section, Container, FlowConnect, Stack } from "$lib/components/atoms/index";
  import CollectionInfo from '$lib/components/sections/generator/CollectionInfo.svelte';
  import ContractInfo from '$lib/components/sections/generator/ContractInfo.svelte';
  import Upload from '$lib/components/sections/generator/Upload.svelte';
  import CollectionPreview from '$lib/components/sections/generator/CollectionPreview.svelte';
  import GeneratorNav from '$lib/components/sections/generator/GeneratorNav.svelte';
  
  const steps = [
    {
      title: "Collection Information",
      component: CollectionInfo,
      description: "Define some general information around your collection."
    }, 
    {
      title: "Upload",
      component: Upload,
      description: "Upload your collection assets"
    }, 
    {
      title: "Collection Preview",
      component: CollectionPreview,
      description: ""
    },
    {
      title: "Contract Information",
      component: ContractInfo,
      description: "Define some general information around your contract."
    } 
  ];

  // The current step of our process.
  let step = 0;

  // The state of all of our step
  let stepState = [];

  // Our handlers
  function onNext(values) {
    if (step === step.length - 1) {
      // On our final step we go TODO: What happens here?
      stepState[step] = values;
      stepState = stepState; // Triggering update
      step = 0;
    } else {
      // If we're not on the last step, store our data and increase a step
      stepState[step] = values;
      stepState = stepState; // Triggering update
      step +=1;
    }
  }

  function onBack(values) {
    if (step === 0) return;
    stepState[step] = values;
    stepState = stepState; // Triggering update
    step -= 1;
  }
</script>

<Section class="padding-top-none padding-bottom-none">
  <div class="main-wrapper">
    {#if $user?.loggedIn}
      <Container class="width-large gutter-y-none">
        <div class="grid-layout">
          <div class="sidebar-container">
            <GeneratorNav bind:step={step} steps={steps}/>
          </div>
          <div class="component-container">
            <svelte:component
              this={steps[step].component}
              {onNext}
              {onBack}
              initialValues={stepState[step]}
            />
          </div>
        </div>
      </Container>
    {:else}
      <Container>
        <Stack>
          <p>Connect your Flow wallet to generate your collection</p>
          <FlowConnect/>
        </Stack>
      </Container>
    {/if}
  </div>
</Section>

<style type="scss">
  .main-wrapper {
    // background-color: blue;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .grid-layout {
    display: grid; 
    grid-template-columns: 250px 1fr;
    gap: 1rem;
    grid-template-areas: 
      "sidebar component";
    
    .sidebar-container { 
      grid-area: sidebar; 
    }
    .component-container { 
      grid-area: component;
      padding: 3rem;
      border: solid 2px var(--clr-gradient-primary);
      border-radius: 1rem;
      height: 70vh;
      overflow: auto;
    }
    
  }
</style>