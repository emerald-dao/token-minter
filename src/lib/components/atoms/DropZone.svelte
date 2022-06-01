<script>
  import { DropZoneFile } from '$lib/components/atoms/index'

  const handleFileInput = () => {
    console.log(inputElement.files);
  }

  const handleFileDrop = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(e.dataTransfer.files)
    inputElement.files = e.dataTransfer.files
    dragOver = false;
    updateThumbnail(dropZoneFiles, e.dataTransfer.files[0])
  }

  const updateThumbnail = (arrayOfFiles, file) => {
    arrayOfFiles.push(file);
  }

  let inputElement;
  let dragOver = false;
  $: dropZoneFiles = [];
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
     <span class="prompt">Drop file here or click to upload</span>
  {/if}
  <input 
    type="file" 
    name="drop-zone" 
    id="drop-zone" 
    on:input={handleFileInput}
    bind:this={inputElement}
  />
</div>

<style type="scss">
  .drop-zone {
    width: 100%;
    height: 50vh;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    color: var(--clr-font-text);
    border: 1px solid var(--clr-primary-main);
    border-radius: 10px;
    transition: 1s;
  }

  .drop-zone-over {
    border-style: solid;
    background-color: var(--clr-primary-main);
  }

  input {
    display: none;
  }
</style>
