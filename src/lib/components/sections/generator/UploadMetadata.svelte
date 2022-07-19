<script>
  import { Stack, UploadMetadataPack } from "$lib/components/atoms/index";
  import { csvMetadata } from "$lib/stores/generator/CsvStore.ts";

  console.log($csvMetadata);
  const BATCH_SIZE = 500;
  function calculateSegments() {
    // This is the exact amount of elements to upload
    const amount = $csvMetadata.length;
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
    }));
  }
  let segments = calculateSegments();
</script>

<Stack direction="column" gap="1rem">
  {#each segments as segment}
    <svelte:component
      this={UploadMetadataPack}
      initialToken={segment.initialToken}
      lastToken={segment.lastToken}
      batchSize={segment.lastToken - segment.initialToken + 1}
      uploadState="to-upload" />
  {/each}
</Stack>
