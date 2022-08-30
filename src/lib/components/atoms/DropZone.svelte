<script>
  import DropZoneFile from "./DropZoneFile.svelte";
  import Icon from "@iconify/svelte";
  let dragOver = false; // Flag to check if we are dragging over the dropzone
  let inputRef; // Reference to the hidden input element
  
  export let name;
  export let id;
  export let fileStore;
  export let deleteFileFromStore;
  export let deleteAllFilesFromStore;
  export let errors; 
  export let placeholder = "Drop file here or click to upload";
  export let type; // Type of file we are expecting
  
  export let saveFunction = (files) => {
    fileStore.update((store) => {
      store = [...store, ...files]
    })
  };

  const handleFileDrop = async (e) => {
    e.preventDefault();
    dragOver = false;
    saveFunction(e.dataTransfer);
  };

  const onInput = (e) => {
    e.preventDefault();
    dragOver = false;
    saveFunction(e.target);
  };
</script>

<div
  class="drop-zone"
  class:drop-zone-over={dragOver}
  class:drop-zone-error={errors && errors.length > 0}
  on:dragover={() => (dragOver = true)}
  on:dragleave={() => (dragOver = false)}
  on:dragend={() => (dragOver = false)}
  on:drop={handleFileDrop}
  on:click={() => inputRef.click()}
  ondragover="return false">

  {#if fileStore && fileStore.length > 2}
    <div class="empty-all-wrapper">
      <div on:click|stopPropagation={deleteAllFilesFromStore()} class="empty-all-icon-wrapper">
        <Icon icon="ion:trash" color="var(--clr-accent-main)"/>
      </div>
    </div>
  {/if}

  {#if fileStore && fileStore.length > 0}
    {#each fileStore as file, index}
      <DropZoneFile
      {file}
      on:deleteFile={deleteFileFromStore(index)} />
    {/each}
  {:else}
    <Icon icon="ion:cloud-upload-outline" color="var(--clr-accent-main-t3)" />
    <span class="prompt">{placeholder}</span>
  {/if}
  {#if errors && errors.length > 0}
    {#each errors as error}
      <p class="error">{error}</p>
    {/each}
  {/if}

  <!-- Add a hidden input element to trigger when the user clicks the drop zone -->
  {#if type === "images-folder"}
    <input name={name} id={id} type="file" bind:this={inputRef} on:input={onInput} webkitdirectory directory multiple>
  {:else if type === "image"}
    <input name={name} id={id} type="file" bind:this={inputRef} on:input={onInput}>
  {:else}
    <input name={name} id={id} type="file" bind:this={inputRef} on:input={onInput}>
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
    border: 2px var(--clr-accent-main-t5) solid;
    background-color: var(--clr-accent-main-t9);
    border-radius: 10px;
    transition: 0.5s;
    overflow-y: auto;
    margin-top: 1rem;

    .prompt {
      font-size: var(--fs-300);
      color: var(--clr-accent-main-t3);
    }

    .empty-all-wrapper {
      width: 100%;
      position: sticky;
      top: -1rem;
      margin-top: -3.8rem;
      margin-right: -2rem;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .empty-all-icon-wrapper {
        background-color: var(--clr-accent-main-t8);
        padding: 0.4rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px var(--clr-accent-main-t7) solid;
      }
    }
  }

  .drop-zone-over {
    background-color: var(--clr-accent-main-t6);
  }
  .drop-zone-error {
    border-color: red;
  }

  input {
    display: none;
  }
</style>
