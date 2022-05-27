<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import { Section, Container, FlowConnect, Stack, Button } from "$lib/components/atoms/index";
  import CollectionInfo from '$lib/components/sections/generator/CollectionInfo.svelte';
  import ContractInfo from '$lib/components/sections/generator/ContractInfo.svelte';
  import Upload from '$lib/components/sections/generator/Upload.svelte';
  import CollectionPreview from '$lib/components/sections/generator/CollectionPreview.svelte';
  import GeneratorNav from '$lib/components/sections/generator/GeneratorNav.svelte';
  import Deploy from '$lib/components/sections/generator/Deploy.svelte';
  import { deployContract } from "../flow/actions.js";
  
  const steps = [
    {
      title: "Collection Information",
      component: CollectionInfo,
      emoji: "ℹ️",
      description: "Define some general information around your collection."
    }, 
    {
      title: "Upload",
      component: Upload,
      emoji: "🗂",
      description: "Upload a folder with your collection. Folder must includ a file namde ....csv with your collection metadata and a folder named Images with your collection images."
    }, 
    {
      title: "Collection Preview",
      component: CollectionPreview,
      emoji: "🖼",
      description: "Looks like everything is in order. Let's see what you've got."
    },
    {
      title: "Contract Information",
      component: ContractInfo,
      emoji: "📜",
      description: "Define some general information around your contract."
    }, 
    {
      title: "Deploy",
      component: Deploy,
      emoji: "🚀",
      description: "Deploy your contract to the blockchain."
    }
  ];

  // The current step of our process.
  let step = 0;

  // Our handlers
  function onNext() {
    if (step === steps.length - 1) {
      // On our final step
      deployContract();
    } else {
      step +=1;
    }
  }

  function onBack() {
    if (step === 0) return;
    step -= 1;
  }
</script>

<Section class="padding-top-none padding-bottom-none">
  <div class="main-wrapper">

    <!-- Display generator if user has loggedIn with wallet -->
    {#if $user?.loggedIn}
      <Container class="width-large gutter-y-none">
        <div class="grid-layout">
          <div class="sidebar-container">
            <GeneratorNav bind:step={step} steps={steps}/>
          </div>
          <div class="main-container">
            <div class="component-container">
              <svelte:component
                this={steps[step].component}
              />
            </div>
          </div>
        </div>
        <div class="buttons-nav">
          <Stack direction="row" justify="flex-end" gap="1em">
            {#if step > 0}
              <Button class="small ghost" on:click={onBack}>Back</Button>
            {/if}
            <Button class="small" on:click={onNext}>
              {#if step === steps.length - 1}
                Deploy to Mainnet
              {:else}
                Next
              {/if}
            </Button>
          </Stack>
        </div>
      </Container>

    <!-- If not connected, ask to connect wallet -->
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
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buttons-nav {
    width: 100%;
  }

  .grid-layout {
    display: grid; 
    grid-template-columns: 270px 1fr;
    gap: 2rem;
    margin-bottom: 1rem;
    grid-template-areas: 
      "sidebar main";
    
    .sidebar-container { 
      grid-area: sidebar; 
    }
    .main-container { 
      grid-area: main;      
      .component-container {
        padding: 2.5rem;
        border-radius: 1rem;
        height: 70vh;
        overflow: auto;
        background-color: hsla(0, 0%, 100%, 0.02);
      }
    }

  }
</style>