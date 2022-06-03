<script>
  import Icon from "@iconify/svelte";
  import { DropZoneFile } from '$lib/components/atoms/index'
  import { createEventDispatcher } from 'svelte';
import { logIn } from "@onflow/fcl";
  
  // Handle file input when loaded through a file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    dragOver = false;
    
    // Some validations
    if (fileType) {
      if (!e.dataTransfer.files[0].type.includes(fileType.replace('*', ''))) {
        alert("Wrong file type");
        return;
      }
    }
    if (maxAmountOfFiles) {
      if (e.dataTransfer.files.length > maxAmountOfFiles) {
        alert("Too many files");
        return;
      }
    }
    
    // Load file to input element
    inputElement.files = e.dataTransfer.files
    
    // Dispatch change event to make Felte aware of the change
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  // When files change, dipatch event so parent component can handle files
  let dispatch = createEventDispatcher();
  $: if (files) {    
		dispatch('changeFiles', files);
	}
  
  let inputElement; // Reference to the input element
  let dragOver = false; // Flag to check if we are dragging over the dropzone
  
  export let fileStore; // Reference to the file store
  export let name; // Name of the input element
  export let promptText = "Drop file here or click to upload";
  export let fileType; // File type to accept
  export let maxAmountOfFiles = 1;
  let files = fileStore; // Get initial files from the store
</script>

<div
  class="drop-zone"
  class:drop-zone-over={dragOver}
  on:click={inputElement.click()}
  on:dragover={() => dragOver = true}
  on:dragleave={() => dragOver = false}
  on:dragend={() => dragOver = false}
  on:drop={handleFileDrop}
  ondragover="return false"
>
  <input
    type="file"
    name={name}
    id={name}
    accept={fileType}
    multiple = {maxAmountOfFiles > 1}
    bind:files
    bind:this={inputElement}
  />

  {#if files && files.length > 0}
    {#each files as file, index}
      <DropZoneFile 
        file={file} 
        on:deleteFile={() => {
          // Turn the FileList to an array => then slice it
          const fileListArr = [...files]
          fileListArr.splice(index, 1);
          files = fileListArr;
        }}
      />
    {/each}
  {:else}
    <Icon icon=ion:cloud-upload-outline/>
    <span class="prompt">{promptText}</span>
  {/if}
</div>

<style type="scss">
  .drop-zone {
    width: 100%;
    min-height: 150px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: var(--clr-font-text);
    border: 1px solid var(--clr-primary-main);
    border-radius: 10px;
    transition: 0.5s;

    .prompt {
      font-size: var(--fs-300)
    }
  }

  input {
    display: none;
  }
  
  .drop-zone-over {
    color: var(--clr-font-text-inverse);
    background-color: var(--clr-primary-main);
  }
</style>
