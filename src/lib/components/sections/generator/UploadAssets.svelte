<script>
  import { DropZone, Button, Stack, TransactionModal } from "$atoms";
  import { userIPFSToken } from "$stores/IPFSstore";
  import { imagesStore, csvStore } from "$stores/CollectionFilesStore";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
  import { uploadToIPFS } from "$lib/utilities/uploadToIPFS";
  import { activeStep } from "$stores/ActiveStepStore";
  import { uploadMetadataToContract } from "$flow/actions.js";
  import { page } from "$app/stores";
  import { resultCID } from "$stores/IPFSstore";

  export let afterCreation = false;

  const onStepSubmit = async () => {
    if ($csvStore.files && $imagesStore.files && $userIPFSToken) {
      if (afterCreation) {
        // TODO: Any simpler way to do it?
        async function uploadAssetsToIpfs() {
          const uploadResult = await uploadToIPFS(
            $csvStore.files,
            $imagesStore.files,
            $userIPFSToken,
            afterCreation
          );
          if (uploadResult !== true) return;
          console.log($activeStep.loading);
          uploadMetadataToContract(
            $page.params.collection,
            $csvStore.metadata,
            500,
            $resultCID
          );
        }
        activeStep.onNext(uploadAssetsToIpfs);
      } else {
        // TODO: Any simpler way to do it?
        async function uploadAssetsToIpfs() {
          return await uploadToIPFS(
            $csvStore.files,
            $imagesStore.files,
            $userIPFSToken,
            afterCreation
          );
        }
        activeStep.onNext(uploadAssetsToIpfs);
      }
    } else {
      alert("Missing assets");
    }
  };

  $: buttonActive =
    $imagesStore.files && $csvStore.files && $userIPFSToken ? true : false;
</script>

{#if $activeStep.loading}
  <TransactionModal
    logoUrl="/ipfs-logo.png"
    transactionName="IPFS"
    loading={true} />
{/if}
<GeneratorStepLayout>
  <Stack direction="column" slot="main-content" gap="3.6rem">
    <span class="helper-text"
      >To understand what to put here, please see our <a
        href="/guide/en/token-minter#upload-assets"
        target="_blank">guide</a
      >.</span>
    <!-- CSV DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneCsv"> Collection Data </label>
      <span class="helper-text"
        >Drop a CSV file containing all your collection metadata.
      </span>
      <DropZone
        name="csv"
        id="csv"
        type="csv"
        placeholder="Drop CSV file"
        errors={$csvStore.errors}
        fileStore={$csvStore.files}
        saveFunction={csvStore.saveFiles}
        deleteFileFromStore={csvStore.deleteAllFiles}
        deleteAllFilesFromStore={csvStore.deleteAllFiles} />
    </div>

    <!-- Images DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneImages"> Collection Images </label>
      <span class="helper-text"
        >Drop a folder containing all your collection images.
      </span>
      <DropZone
        name="images"
        id="images"
        type="images-folder"
        placeholder="Drop Images folder"
        fileStore={$imagesStore.files}
        errors={$imagesStore.errors}
        saveFunction={imagesStore.saveFiles}
        deleteFileFromStore={imagesStore.deleteFile}
        deleteAllFilesFromStore={imagesStore.deleteAllFiles} />
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

  <Button
    slot="buttons"
    loading={$activeStep.loading}
    leftIcon="arrow-up-circle"
    on:click={onStepSubmit}
    disabled={!buttonActive}>
    {#if $activeStep.loading}
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
