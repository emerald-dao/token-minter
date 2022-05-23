<script>
  import Icon from "@iconify/svelte";
  import { Button, Stack } from "$lib/components/atoms/index";
  import { createForm } from 'felte';
  import { handleAssetFolderDrop } from '$lib/utilities/handleAssets.js';

  export let initialValues;
  export let onNext = console.log("submit");
  export let onBack;

	let options = {};
	let files;

  const { form, data } = createForm({ onNext });

  // Drop files handling
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }
  
</script>

<form use:form>
  <!-- TODO: Handle drop-zone styles -->
  <div id='drop_zone' class='dropDiv' on:dragover={handleDragOver} on:drop={handleAssetFolderDrop}>
    <Icon icon=ion:cloud-upload-outline/>
    <p>
      Drop your folder here
    </p>    
  </div>
  <Stack direction="row">
    <Button type="button" class="small ghost" on:click="{() => onBack($data)}">
    Previous page
    </Button>
    <Button type="submit" class="small" on:click="{() => onNext()}">Next</Button>
  </Stack>
</form>

<style type="scss">
  div {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
    justify-content: center;
    border: solid 1px var(--clr-primary-main);
    border-radius: 5rem;
    margin-bottom: 2rem;
  }
</style>