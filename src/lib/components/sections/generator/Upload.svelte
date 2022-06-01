<script>
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
      onSubmitAction();
      console.log(data)
    },
		// extend: [
		// 	validator({ schema }),
		// ],
	});
</script>

<form use:form>
  <div class="main-wrapper">
    <div class="input-wrapper">
      <label for="drop-zone-csv">
        Collection Data
      </label>
      <span class="helper-text">Drop a CSV file containing all your collection metadata.</span>
      {#if $errors.file}
        <span class="error">{$errors.file}</span>
      {/if}
      <DropZone promptText="Drop CSV file" fileType="text/csv" name="drop-zone-csv"/>
    </div>
    
    <div class="input-wrapper">
      <label for="drop-zone-images">
        Collection Images
      </label>
      <span class="helper-text">Drop a folder containing all your collection images.</span>
      {#if $errors.file}
      <span class="error">{$errors.file}</span>
      {/if}
      <DropZone promptText="Drop Images folder" name="drop-zone-images"/>
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

    .main-wrapper {
      display: flex;
			flex-direction: column;
			width: 100%;
      height: 100%;
      gap: 2rem;

      .input-wrapper {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>