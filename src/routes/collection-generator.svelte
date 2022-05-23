<!-- Page that dynamically renders each step of the Collection Generation process -->
<script>
  import { user } from "../flow/stores.js";
  import { Section, Container, FlowConnect, Stack, AdaptableGrid } from "$lib/components/atoms/index";
  import CollectionInfo from '$lib/components/sections/generator/CollectionInfo.svelte';
  import ContractInfo from '$lib/components/sections/generator/ContractInfo.svelte';
  import Upload from '$lib/components/sections/generator/Upload.svelte';
  import CollectionPreview from '$lib/components/sections/generator/CollectionPreview.svelte';
  import GeneratorNav from '$lib/components/sections/generator/GeneratorNav.svelte';
  
  const steps = [
    {
      title: "Collection Information",
      component: CollectionInfo,
    }, 
    {
      title: "Upload",
      component: Upload
    }, 
    {
      title: "Collection Preview",
      component: CollectionPreview
    },
    {
      title: "Contract Information",
      component: ContractInfo
    } 
  ];

  // The current step of our process.
  let step = 0;

  // The state of all of our step
  let stepState = [];

  // Our handlers
  function onNext(values) {
    if (step === step.length - 1) {
      // On our final step we POST our data somewhere
      return fetch('https://example.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stepState),
      }).then(response => {
        // We handle the response
      });
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

{#if $user?.loggedIn}
  <Section>
    <Container class="width-large">
      <GeneratorNav bind:step={step} steps={steps}/>
      <AdaptableGrid>
        <svelte:component
          this={steps[step].component}
          {onNext}
          {onBack}
          initialValues={stepState[step]}
        />
      </AdaptableGrid>
    </Container>
  </Section>
{:else}
  <Section>
    <Container>
      <Stack>
        <p>Connect your Flow wallet to generate your collection</p>
        <FlowConnect/>
      </Stack>
    </Container>
  </Section>
{/if}