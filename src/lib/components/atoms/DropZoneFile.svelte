<script>
  import Icon from "@iconify/svelte";
  import { afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  afterUpdate (() => {
		displayThumbnail(file);
	});

  const displayThumbnail = (file) => {
    if (file.type && file.type.startsWith('image/')) { 
      const reader = new FileReader();
      reader.readAsDataURL(file); // base 64 format
      
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`; /*asynchronous call. This function runs once reader is done reading file. reader.result is the base 64 format*/
        thumbnailElement.style.height = "100%";
        thumbnailElement.style.aspectRatio = "1/1";
        thumbnailElement.style.backgroundSize = "cover";
        thumbnailElement.style.display = "flex";
        thumbnailElement.style.borderRadius = "0.2rem";
      };
    };
  };

  let dispatch = createEventDispatcher();

  let thumbnailElement;
  export let file;
</script>

<div class="drop-zone-file">
  {#if file.type && file.type.startsWith('image/')}
    <div bind:this={thumbnailElement} class="thumbnailElement"/>
  {/if}
  <div class="file-data">
    <h5>{file.name}</h5>
  </div>
  <div on:click|stopPropagation={() => dispatch('deleteFile')}>
    <Icon icon=ion:close-circle color="var(--clr-primary-main)"/>
  </div>
</div>

<style type="scss">
  @use "../../styles/abstracts" as *;

  .drop-zone-file { 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1.4rem;
    height: 5rem;
    min-height: 5rem;
    width: 100%;
    border-radius: 0.6rem;
    background-color: var(--clr-accent-soft-t9);
    border: 0.5px var(--clr-accent-soft-t4) solid;
    font-size: var(--fs-200);
    position: relative;

    @include mq(small) {
      flex-direction: row;
    }

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