<script>
  import { StepsButtons, DropZone } from "$lib/components/atoms/index";
  import { csvState, imagesState, imagesFiles, csvFiles } from "$lib/generator/CollectionFilesStore";
  import { csvDropHandling, imagesDropHandling } from "$lib/generator/dropHandling"
  // When CSV and images are uploaded run the cross check validation
  // $: if(csvUploaded && imagesUploaded) crossedChecked = crossCheckValidation($csv.files, $images.files);

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
      <DropZone 
        promptText="Drop CSV file" 
        dropHandlingFunction={csvDropHandling}
        bind:fileStore={$csvFiles}
        fileState={$csvState}
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
        dropHandlingFunction={imagesDropHandling}
        bind:fileStore={$imagesFiles}
        fileState={$imagesState}
      />
    </div>
  </div>
  <StepsButtons 
    onSubmitAction={onSubmitAction} 
    onSubmitText={onSubmitText} 
    disabled={!$csvState.uploadState === 'success' || !imagesState.uploadState === "success"}
  />

  <div>
    {$csvState.uploadState}
    {$imagesState.uploadState}
  </div>
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