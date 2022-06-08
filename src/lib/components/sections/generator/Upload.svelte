<script>
  import { StepsButtons, DropZone } from "$lib/components/atoms/index";
  import { imagesFiles, csvFiles } from "$lib/stores/CollectionFilesStore";
  import { handleAssetFolderDrop } from '$lib/utilities/handleAssets.js';
</script>

<div class="main-wrapper">

  <!-- CSV DropZone -->
  <div class="input-wrapper">
    <label for="dropZoneCsv">
      Collection Data
    </label>
    <span class="helper-text">Drop a CSV file containing all your collection metadata.</span>
    <DropZone 
      promptText="Drop CSV file" 
      bind:files={$csvFiles}
    />
  </div>
  
  <!-- Images DropZone -->
  <div class="input-wrapper">
    <label for="dropZoneImages">
      Collection Images
    </label>
    <span class="helper-text">Drop a folder containing all your collection images.</span>
    <DropZone 
      promptText="Drop Images folder"   
      bind:files={$imagesFiles}
    />
  </div>

  <StepsButtons/>
</div>

<style type="scss">
  .main-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 2rem;

    .input-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
</style>