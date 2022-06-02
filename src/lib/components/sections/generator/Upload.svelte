<script>
  import { StepsButtons, DropZone } from "$lib/components/atoms/index";
  import { createForm } from 'felte';
  import { imagesFiles, csvFiles } from "$lib/stores/CollectionFilesStore";
  import { handleAssetFolderDrop } from '$lib/utilities/handleAssets.js';
  import { object, mixed } from 'yup';
	import { validator } from '@felte/validator-yup';

  export let onSubmitText;
  export let onSubmitAction;

  const saveFilesInStore = (event, store) => {
    store.set(event.detail);
  };

  const schema = object().shape({
    dropZoneCsv: mixed()
					.test("required", "You need to provide a file", (file) => {
					// return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
						if (file) return true;
						return false;
					}),
    dropZoneImages: mixed()
					.test("required", "You need to provide a file", (file) => {
					// return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
						if (file.length > 0) return true;
						return false;
					})
		});

  const { form, errors } = createForm({
		onSubmit() {
      onSubmitAction();
    },
		extend: [
			validator({ schema }),
		],
	});
</script>

<form use:form>
  <div class="main-wrapper">

    <!-- CSV DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneCsv">
        Collection Data
      </label>
      <span class="helper-text">Drop a CSV file containing all your collection metadata.</span>
      {#if $errors.file}
        <span class="error">{$errors.file}</span>
      {/if}
      <DropZone 
        promptText="Drop CSV file" 
        fileType="text/csv" 
        name="dropZoneCsv" 
        fileStore={$csvFiles}
        on:changeFiles={(e) => saveFilesInStore(e, csvFiles)}
      />
      {#if $errors.dropZoneCsv}
				<span class="error">{$errors.dropZoneCsv}</span>
			{/if}
    </div>
    
    <!-- Images DropZone -->
    <div class="input-wrapper">
      <label for="dropZoneImages">
        Collection Images
      </label>
      <span class="helper-text">Drop a folder containing all your collection images.</span>
      {#if $errors.file}
        <span class="error">{$errors.file}</span>
      {/if}
      <DropZone 
        promptText="Drop Images folder" 
        fileType="image/*" 
        name="dropZoneImages" 
        maxAmountOfFiles={500} 
        fileStore={$imagesFiles}
        on:changeFiles={(e) => saveFilesInStore(e, imagesFiles)}
      />
      {#if $errors.dropZoneImages}
				<span class="error">{$errors.dropZoneImages}</span>
			{/if}
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