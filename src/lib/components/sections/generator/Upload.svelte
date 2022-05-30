<script>
  import Icon from "@iconify/svelte";
  import { StepsButtons, Stack } from "$lib/components/atoms/index";
  import { createForm } from 'felte';
  import { handleAssetFolderDrop } from '$lib/utilities/handleAssets.js';

	let options = {};
	let files;
  export let onSubmitText;
  export let onSubmitAction;

  const { form, data } = createForm();

  // Drop files handling
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }
  
</script>

<form use:form>
  <div class="inputs-wrapper">
    <label for="drop_zone">
      CSV File + Images
    </label>
    <span class="helper-text">Drop a folder containing a CSV file + a images folder</span>
    <div name='drop_zone' id='drop_zone' class='drop-zone' on:dragover={handleDragOver} on:drop={handleAssetFolderDrop}>
      <Icon icon=ion:cloud-upload-outline/>
      <p>
        Drop your folder here
      </p>    
    </div>
  </div>

  <StepsButtons onSubmitText={onSubmitText} onSubmitAction={onSubmitAction}/>
</form>

<style type="scss">
  form {
    height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;

    .inputs-wrapper {
      display: flex;
			flex-direction: column;
			width: 100%;
      height: 100%;

      .drop-zone {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        justify-content: center;
        border: solid 1px var(--clr-primary-main);
        border-radius: 3rem;
        margin-bottom: 2rem;
      }
    }
  }
</style>