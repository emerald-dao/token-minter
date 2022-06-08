<script>
  import Icon from "@iconify/svelte";
  import { DropZoneFile } from '$lib/components/atoms/index';
  import { getFilesAsync } from '$lib/utilities/handleFileDrop';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Handle drop
  const handleFileDrop = async (e) => {
    e.preventDefault();
    dragOver = false;

    if (await validateDrop(e.dataTransfer) === true) {
      
      files = await getFilesAsync(e.dataTransfer);
      errorOnUpload = false;
      dispatch('uploaded-files');

    } else {
      errorOnUpload = true;
    }
  }

  let dragOver = false; // Flag to check if we are dragging over the dropzone
  
  let errorOnUpload = false;
  export let files;
  export let validateDrop;
  export let promptText = "Drop file here or click to upload";
</script>

<div
  class="drop-zone"
  class:drop-zone-over={dragOver}
  class:drop-zone-error={errorOnUpload}
  on:dragover={() => dragOver = true}
  on:dragleave={() => dragOver = false}
  on:dragend={() => dragOver = false}
  on:drop={handleFileDrop}
  ondragover="return false"
>
  {#if files && files.length > 0}
    {#each files as file, index}
      <DropZoneFile 
        file = {file}
        on:deleteFile={() => {
          files.splice(index, 1);
          files = files
        }}
      />
    {/each}
  {:else}
    <Icon icon=ion:cloud-upload-outline/>
    <span class="prompt">{promptText}</span>
    {#if errorOnUpload}
      <span class="error">Invalid file</span>
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
