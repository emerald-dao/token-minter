<script>
  import Icon from "@iconify/svelte";
  import { DropZoneFile } from '$lib/components/atoms/index';
  import { emptyCsvStore } from '$lib/generator/stores/CsvStore';
  import { setImagesStateToIdle } from '$lib/generator/stores/ImagesStore';

  const handleFileDrop = async (e) => {
    e.preventDefault();
    dragOver = false;
    dropHandlingFunction(e.dataTransfer);
  }

  let dragOver = false; // Flag to check if we are dragging over the dropzone
  
  export let fileStore;
  export let fileState;
  export let dropHandlingFunction; // Function containing validation logic + parsing logic + storing logic
  export let promptText = "Drop file here or click to upload";
  export let type; // Type of file we are expecting
</script>

<div
  class="drop-zone"
  class:drop-zone-over={dragOver}
  class:drop-zone-error={fileState.errorMessages.length > 0}
  on:dragover={() => dragOver = true}
  on:dragleave={() => dragOver = false}
  on:dragend={() => dragOver = false}
  on:drop={handleFileDrop}
  ondragover="return false"
>
  {#if fileStore && fileStore.length > 0 && type === "image"}
    {#each fileStore as file, index}
      <DropZoneFile 
        file = {file}
        on:deleteFile={() => {
          fileStore.splice(index, 1);
          fileStore = fileStore;
          if (fileStore.length === 0) {
            setImagesStateToIdle();
          }
        }}
      />
    {/each}
  {:else if !(fileStore === null) && type === "csv"}
    <DropZoneFile 
      file = {fileStore}
      on:deleteFile={() => 
        emptyCsvStore()
      }
    />
  {:else}
    <Icon icon=ion:cloud-upload-outline/>
    <span class="prompt">{promptText}</span>
    {#if fileState.errorMessages.length > 0}
      {#each fileState.errorMessages as error}
        <p class="error">{error}</p>
      {/each}
    {/if}
  {/if}
</div>

<style type="scss">
  .drop-zone {
    width: 100%;
    height: auto;
    max-height: 16rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    cursor: pointer;
    color: var(--clr-font-text);
    border: 1px solid var(--clr-primary-main);
    border-radius: 10px;
    transition: 0.5s;
    overflow-y: auto;

    .prompt {
      font-size: var(--fs-300)
    }
  }
  
  .drop-zone-over {
    color: var(--clr-font-text-inverse);
    background-color: var(--clr-primary-main);
  }
  .drop-zone-error {
    border-color: red;
  }
</style>
