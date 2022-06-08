<script>
  import { StepsButtons, DropZone } from "$lib/components/atoms/index";
  import { imagesFiles, csvFile } from "$lib/stores/CollectionFilesStore";
  import { handleAssetFolderDrop } from '$lib/utilities/handleAssets.js';

  // Flags for knowing if the correct files are uploaded
  let csvUploaded = false;
  let imagesUploaded = false;

  export let onSubmitAction;
  export let onSubmitText;
</script>

<div class="main-wrapper">

  <div class="drop-zones-wrapper">
    <!-- CSV DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneCsv">
        Collection Data
      </label>
      <span class="helper-text">Drop a CSV file containing all your collection metadata.</span>
      <!-- TODO: Add CSV validation function -->
      <DropZone 
        promptText="Drop CSV file" 
        validateDrop={() => { return true }}
        on:uploaded-files={() => csvUploaded = true}
        bind:files={$csvFile}
      />
    </div>
    
    <!-- Images DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneImages">
        Collection Images
      </label>
      <span class="helper-text">Drop a folder containing all your collection images.</span>
      <!-- TODO: Add images validation function -->
      <DropZone 
        promptText="Drop Images folder"
        validateDrop={() => { return true }}
        on:uploaded-files={() => imagesUploaded = true}
        bind:files={$imagesFiles}
      />
    </div>
  </div>
  <StepsButtons onSubmitAction={onSubmitAction} onSubmitText={onSubmitText} disabled={!csvUploaded || !imagesUploaded}/>
</div>

<style type="scss">
  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 2rem;

    .drop-zones-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 1.5rem;
      
      .input-wrapper {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>