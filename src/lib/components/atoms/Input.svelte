<script>
  import { getValue } from "felte";
  import DropZone from "./DropZone.svelte";

  export let header;
  export let name;
  export let errors;
  export let placeholder;
  export let required = false;
  export let type;
  export let helperText;
  export let store;
  export let bindValue;
  export let radioOptions = [];

  console.log(radioOptions);
</script>

<div class="input">
  <label for={name}>{`${header}${required ? " *" : ""}`}</label>
  {#if helperText}
    <span class="helper-text">{helperText}</span>
  {/if}
  {#if type === "text"}
    {#if store}
      <input
        {name}
        id={name}
        {placeholder}
        type="text"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]}
        bind:value={$store[name]} />
    {:else}
      <input
        {name}
        id={name}
        {placeholder}
        type="text"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]}
        bind:value={bindValue} />
    {/if}
  {:else if type === "number"}
    {#if store}
      <input
        {name}
        id={name}
        {placeholder}
        type="number"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]}
        bind:value={$store[name]} />
    {:else}
      <input
        {name}
        id={name}
        {placeholder}
        type="number"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]}
        bind:value={bindValue} />
    {/if}
  {:else if type === "image"}
    <DropZone
      {name}
      id={name}
      {placeholder}
      type="image"
      fileStore={$store.files}
      errors={$store.errors}
      saveFunction={store.saveFiles}
      deleteFileFromStore={store.deleteFile}
      deleteAllFilesFromStore={store.deleteAllFiles} />
  {:else if type === "radio"}
    {#each radioOptions as { value, image }, idx}
      <div class="option">
        <div>
          <img width="50px" src={image} alt={value} />
          <span>
            {value}
          </span>
        </div>
        <input
          type="radio"
          id="{name}_{idx}"
          {name}
          {value}
          bind:group={$store[name]} />
      </div>
    {/each}
  {/if}

  <div class="error-div">
    {#if errors[name]}
      <span class="error">{errors[name][0]}</span>
    {/if}
  </div>
</div>

<style type="scss">
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .option {
    display: flex;
    margin-bottom: 5px;
    padding: 10px;
  }

  .option > div {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }
</style>
