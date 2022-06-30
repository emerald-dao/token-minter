<script>
  import { Stack, UploadMetadataPack } from "$lib/components/atoms/index"
</script>

<Stack direction="column" gap="1rem">
  <UploadMetadataPack initialToken="0" lastToken="499" uploadState="uploaded"/>
  <UploadMetadataPack initialToken="500" lastToken="999" uploadState="to-upload"/>
  <UploadMetadataPack initialToken="1000" lastToken="1499" uploadState="waiting"/>
</Stack>