<script>
  import { Stack, UploadMetadataPack } from "$atoms";
  import { csvStore } from "$stores/CollectionFilesStore";
  import { activeStep } from '$stores/ActiveStepStore';
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";

  const BATCH_SIZE = 500;
  function calculateSegments() {
    // This is the exact amount of elements to upload
    const amount = $csvStore.metadata.length;
    const array = new Array(Math.floor(amount / BATCH_SIZE))
      .fill(BATCH_SIZE)
      .concat(amount % BATCH_SIZE);
    // Calculates the different segments we will need
    return array.map((element, i) => ({
      initialToken: BATCH_SIZE * i,
      lastToken: Math.min(
        BATCH_SIZE * (i + 1) - 1,
        BATCH_SIZE * i + element - 1
      ),
      uploadState: "waiting",
    }));
  }
  let segments = calculateSegments();

  // Make packs available for upload one by one. 
  let uploadedPacks = 0;
  const updateSegments = () => {
    uploadedPacks++;
    segments[uploadedPacks - 1].uploadState = "uploaded";
    
    // If all packs are uploaded, go to the next step
    if (uploadedPacks === segments.length) {
      console.log("All metadata is uploaded")
      activeStep.onNext();
    } else {
      segments[uploadedPacks].uploadState = "to-upload";
    }
  }

  // Make the first pack available for upload
  segments[0].uploadState = "to-upload";
</script>

<GeneratorStepLayout>
  <Stack direction="column" gap="1rem" slot="main-content">
    {#each segments as segment}
      <UploadMetadataPack
        initialToken={segment.initialToken}
        lastToken={segment.lastToken}
        batchSize={segment.lastToken - segment.initialToken + 1}
        bind:uploadState={segment.uploadState} 
        on:uploaded={updateSegments}/>
    {/each}
  </Stack>
</GeneratorStepLayout>