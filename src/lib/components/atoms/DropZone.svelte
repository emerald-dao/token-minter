<script>
  import Icon from "@iconify/svelte";
  import { DropZoneFile } from '$lib/components/atoms/index' 

  const handleFileInput = (e) => {
    e.preventDefault();
    updateDropZoneFiles(e.target.files[0]);
    console.log(inputElement.files)
  }
  
  const handleFileDrop = (e) => {
    e.preventDefault();
    dragOver = false;

    if (fileType) {
      if (fileType != e.dataTransfer.files[0].type) {
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

    updateDropZoneFiles(e.dataTransfer.files[0]);
    inputElement.files = e.dataTransfer.files;
    console.log(inputElement.files)
  }

  const updateDropZoneFiles = (file) => {
    if (maxAmountOfFiles > 1) {
      dropZoneFiles = [...dropZoneFiles, file]
    } else dropZoneFiles = [file]
  }

  let inputElement;
  let dragOver = false;
  let dropZoneFiles = [];

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
  {#if dropZoneFiles.length}
    {#each dropZoneFiles as file}
      <DropZoneFile fileName={file.name} fileSize={file.size} uploaded={true}/>
    {/each}
  {:else}
    <Icon icon=ion:cloud-upload-outline/>
    <span class="prompt">{promptText}</span>
  {/if}
  <input 
    type="file" 
    name={name}
    id={name}
    accept={fileType}
    on:input={handleFileInput}
    bind:this={inputElement}
  />
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
