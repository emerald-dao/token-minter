<script>
  import Icon from "@iconify/svelte";
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  onMount (() => {
		displayThumbnail(file);
	});

  const displayThumbnail = (file) => {
    if (!file.type.includes("image")) return
    const reader = new FileReader();
    reader.readAsDataURL(file); // base 64 format
    
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`; /*asynchronous call. This function runs once reader is done reading file. reader.result is the base 64 format*/
      thumbnailElement.style.height = "3.5rem";
      thumbnailElement.style.aspectRatio = "1/1";
      thumbnailElement.style.backgroundSize = "cover";
      thumbnailElement.style.display = "flex";
      thumbnailElement.style.borderRadius = "0.2rem";
    };
  };
      

  let dispatch = createEventDispatcher();

  let thumbnailElement;
  export let file;
</script>

<div class="drop-zone-file">
  
  <div bind:this={thumbnailElement} class="thumbnailElement"/>
  <div class="file-data">
    <h5>{file.name}</h5>
    <span>{file.size}</span>
  </div>

  <div on:click|stopPropagation={() => dispatch('deleteFile')}>
    <Icon icon=ion:close-circle color="var(--clr-primary-main)"/>
  </div>
</div>

<style type="scss">
  .drop-zone-file {
    display: flex;
    direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.5rem;
    width: 100%;
    border-radius: 0.6rem;
    overflow: hidden;
    // TODO: Apply dynamic colors
    background-color: hsla(234, 67%, 40%, 0.4);
    font-size: var(--fs-200);
    background-size: cover;
    position: relative;

    .thumbnailElement {
      display: none;
    }

    .file-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }
  }
</style>