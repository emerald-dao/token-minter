<script>
  import { Stack, UploadMetadataPack } from "$lib/components/atoms/index";
  import { csvMetadata } from "$lib/stores/generator/CsvStore.ts";

  console.log(csvMetadata);
  function calculateSegments() {
    const BATCH_SIZE = 500;
    const segmentLength = csvMetadata.length / BATCH_SIZE;
  }
  let segments = calculateSegments();
</script>

<Stack direction="column" gap="1rem">
  <UploadMetadataPack
    initialToken="0"
    lastToken="499"
    uploadState="to-upload" />
  <UploadMetadataPack
    initialToken="500"
    lastToken="999"
    uploadState="to-upload" />
  <UploadMetadataPack
    initialToken="1000"
    lastToken="1499"
    uploadState="to-upload" />
</Stack>
