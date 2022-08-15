<script>
  import { DropZone, Button, Stack } from "$lib/components/atoms/index";
  import { userIPFSToken } from "$lib/stores/generator/IPFSstore";
  import { csvState, csvFile, csvMetadata } from "$lib/stores/generator/CsvStore.ts";
  import { imagesState, imagesFiles } from "$lib/stores/generator/ImagesStore";
  import {
    csvDropHandling,
    imagesDropHandling,
  } from "$lib/generator/dropHandling";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
  import { uploadToIPFS } from '$lib/utilities/uploadToIPFS';
  import { onNext } from "$lib/stores/generator/updateFunctions";
  import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";

  const onStepSubmit = async () => {
    if ($csvFile && $imagesFiles && $userIPFSToken) {
      // TODO: Any simpler way to do it?
      async function uploadAssetsToIpfs() {
        return await uploadToIPFS($csvMetadata, $imagesFiles, $userIPFSToken);
      }
      onNext(uploadAssetsToIpfs);
    } else {
      alert("Missing assets");
    }
	}

  $: buttonActive = $csvFile && $imagesFiles && $userIPFSToken ? true : false;
</script>

<GeneratorStepLayout>
  <Stack direction="column" slot="main-content">
    <!-- CSV DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneCsv"> Collection Data </label>
      <span class="helper-text"
        >Drop a CSV file containing all your collection metadata.
        <br/>Each NFT must have a 'name', 'description', and 'image' (file name) in it's metadata.
        <br/>Download this <a href="/assets/metadata.csv" download>template</a> to have a basic CSV structure.
      </span>
      <DropZone
        promptText="Drop CSV file"
        dropHandlingFunction={csvDropHandling}
        bind:fileStore={$csvFile}
        fileState={$csvState}
        type="csv" />
    </div>

    <!-- Images DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneImages"> Collection Images </label>
      <span class="helper-text"
        >Drop a folder containing all your collection images.
        <br/>Images file names must match the ones in the metadata CSV.
      </span>
      <DropZone
        promptText="Drop Images folder"
        dropHandlingFunction={imagesDropHandling}
        bind:fileStore={$imagesFiles}
        fileState={$imagesState}
        type="image" />
    </div>

    <div class="form">
      <label for="ipfs-token">IPFS Key</label>
      <span class="helper-text">
        To get your own IPFS Key
        <span class="estimated-time">[3 minutes aprox.]</span>
        <ol>
          <li>
            Log in to <a href="https://nft.storage/login/" target="_blank"
              >nft.storage</a>
          </li>
          <li>Click "API Keys"</li>
          <li>Click "+ New Key" and create your own key</li>
        </ol>
      </span>
      <input
        name="ipfs-token"
        id="ipfs-token"
        placeholder="Your IPFS Key"
        type="text"
        bind:value={$userIPFSToken} />
    </div>
  </Stack>

  <Button slot="buttons" state={$stepsArray[$activeStep].state} leftIcon="arrow-up-circle" on:click={onStepSubmit} disabled={!buttonActive}>
    {#if $stepsArray[$activeStep].state === "loading"}
      Uploading to IPFS
    {:else}
      Upload to IPFS
    {/if}
  </Button>
</GeneratorStepLayout>

<style type="scss">
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  } 

  .estimated-time {
    font-size: var(--fs-100);
    color: var(--clr-font-text-soft-t4);
    margin-left: 0.4rem;
  }
</style>
