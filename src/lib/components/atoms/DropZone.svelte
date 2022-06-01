<script>
  import Icon from "@iconify/svelte";
  import { DropZoneFile } from '$lib/components/atoms/index' 

  // Handle file input when loaded through a file input
  const handleFileInput = (e) => {
    e.preventDefault();
    // Fix re-render bug
    inputElement = inputElement
  }
  
  // Handle file input when loaded through a file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    dragOver = false;
    console.log(e.dataTransfer.files)

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

    inputElement.files = e.dataTransfer.files;
  }

  let inputElement;
  let dragOver = false;

  export let name;
  export let promptText = "Drop file here or click to upload";
  export let fileType;
  export let maxAmountOfFiles = 1;
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
    on:input={handleFileInput}
    bind:this={inputElement}
  />

  {#if typeof inputElement === "object"}
    {#if inputElement.files.length > 0}
      {#each inputElement.files as file}
        <DropZoneFile fileName={file.name} fileSize={file.size} uploaded={true}/>
      {/each}
    {:else}
      <Icon icon=ion:cloud-upload-outline/>
      <span class="prompt">{promptText}</span>
    {/if}
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
    transition: 1s;

    .prompt {
      font-size: var(--fs-300)
    }
  }

  input {
    display: none;
  }

  .drop-zone-over {
    border-style: solid;
    background-color: var(--clr-primary-main);
  }
</style>
