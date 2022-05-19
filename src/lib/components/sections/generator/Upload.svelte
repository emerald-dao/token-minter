<script>
  import Icon from "@iconify/svelte";
  import { Section, Container, Button, Stack } from "$lib/components/atoms/index";
  import { filedrop } from "filedrop-svelte";
  import { createForm } from 'felte';

  export let initialValues;
  export let onSubmit;
  export let onBack;

	let options = {};
	let files;

  const { form, data } = createForm({ onSubmit });
</script>

<Section>
  <Container>
    <form use:form>
      <div use:filedrop={options} on:filedrop={(e) => {files = e.detail.files}}>
        <input type="file">
        <Icon icon="ion:cloud-upload-outline"/>
        Drop Files
      </div>
    </form>
    <Button type="button" on:click="{() => onBack($data)}">
      Previous page
		</Button>
    <Button type="submit" class="small">Upload Files to IPFS</Button>
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