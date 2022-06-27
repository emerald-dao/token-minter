<script>
  import { StepsButtons, DropZone } from "$lib/components/atoms/index";
  import { userIPFSToken } from "$lib/stores/generator/IPFStokenStore";
  import { csvState, csvFile } from "$lib/stores/generator/CsvStore";
  import { imagesState, imagesFiles } from "$lib/stores/generator/ImagesStore";
  import { csvDropHandling, imagesDropHandling } from "$lib/generator/dropHandling"

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
        bind:fileStore={$csvFile}
        fileState={$csvState}
        type="csv"
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
        type="image"
      />
    </div>
  </div>
  
  <div class="form">
    <label for="ipfs-token">IPFS Token</label>
    <!-- TODO: Add tutorial on how to get an IPFS token  -->
    <span class="helper-text">Follow this tutorial on how to get your IPFS Token.</span>
    <input 
      name="ipfs-token"
      id="ipfs-token"
      placeholder="Your IPFS Token"
      type="text"
      bind:value={$userIPFSToken}
    />
  </div> 

  <StepsButtons 
    onSubmitAction={onSubmitAction} 
    onSubmitText={onSubmitText} 
    disabled={!($csvState.uploadState === 'success') || !(imagesState.uploadState === "success")}
  />

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