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
</script>

<div>
  <Button type="button" on:click="{() => onBack($data)}">
      Previous page
  </Button>
  <Button type="submit" class="small" on:click="{() => onNext()}">Next</Button>
</div>

<style type="scss">

</style>