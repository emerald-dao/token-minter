<script>
  import Icon from "@iconify/svelte";
  import { StepsButtons, DropZone } from "$lib/components/atoms/index";
  import { createForm } from 'felte';
  import { handleAssetFolderDrop } from '$lib/utilities/handleAssets.js';
  import { object, mixed } from 'yup';
	import { validator } from '@felte/validator-yup';

	let options = {};
	let files;
  export let onSubmitText;
  export let onSubmitAction;

  const schema = object().shape({
    file: mixed()
					.test("required", "You need to provide a file", (file) => {
					// return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
						if (file) return true;
						return false;
					})
					.test("fileSize", "The file is too large", (file) => {
						//if u want to allow only certain file sizes
						return file && file.size <= 200000000000;
					})
		});

  const { form, errors, data } = createForm({
		onSubmit() {
      console.log(data)
      onSubmitAction();
    },
		// extend: [
		// 	validator({ schema }),
		// ],
	});

  // Drop files handling
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }
  
</script>

<form use:form>
  <div class="inputs-wrapper">
    <DropZone/>
    <label for="drop_zone">
      CSV File + Images
    </label>
    <span class="helper-text">Drop a folder containing a CSV file + a images folder</span>
    {#if $errors.file}
      <span class="error">{$errors.file}</span>
    {/if}
    <div name='drop_zone' id='drop_zone' class='drop-zone' on:dragover={handleDragOver} on:drop={handleAssetFolderDrop}>
      <Icon icon=ion:cloud-upload-outline/>
      <p>
        Drop your folder here
      </p>    
    </div>
  </div>

  <StepsButtons onSubmitText={onSubmitText} submit errors={$errors}/>
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