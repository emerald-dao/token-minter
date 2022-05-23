<script>
  import Icon from "@iconify/svelte";
  import { Section, Container, Button, Stack } from "$lib/components/atoms/index";
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

<Section>
  <Container>
    <form use:form>
      <!-- TODO: Handle drop-zone styles -->
      <div id='drop_zone' class='dropDiv' on:dragover={handleDragOver} on:drop={handleAssetFolderDrop} style='border: 1px solid; height: 200px; width: 50%; background-color: powderblue;'/>
      <Button type="button" on:click="{() => onBack($data)}">
        Previous page
      </Button>
      <Button type="submit" class="small" on:click="{() => onNext()}">Next</Button>
    </form>
  </Container>
</Section>

<style type="scss">
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--clr-primary-main);
    border-radius: 5rem;
    padding-block: 10rem;
  }
</style>