<script>
  import { createForm } from 'felte';

  export let initialValues;
  export let onSubmit;
  export let onBack;

  const { form, data } = createForm({ onSubmit });
</script>

<form use:form>
  2
  <input name="firstName">
  <input name="lastName">
  <input name="aboutMe">
  <button type="button" on:click="{() => onBack($data)}">
    Previous page
  </button>
  <button type="submit">Next page</button>
</form>