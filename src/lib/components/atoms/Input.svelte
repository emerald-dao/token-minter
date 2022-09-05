<script>
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
</script>

<div class="input">
  <label for={name}>{`${header}${required ? " *" : ""}`}</label>
  {#if helperText}
    <span class="helper-text">{helperText}</span>
  {/if}
  {#if type === "text"}
    {#if store}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        type="text"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]} 
        bind:value={$store[name]}  
      />
    {:else}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        type="text"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]} 
        bind:value={bindValue}  
      />
    {/if}
  {:else if type === "number"}
    {#if store}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        type="number"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]} 
        bind:value={$store[name]}  
      />
    {:else}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        type="number"
        class:input-error={errors[name]}
        class:input-ok={!errors[name]} 
        bind:value={bindValue}  
      />
    {/if}
  {:else if type === "image"}
    <DropZone
      name={name}
      id={name}
      placeholder={placeholder}
      type="image"
      fileStore={$store.files}
      errors={$store.errors}
      saveFunction={store.saveFiles}
      deleteFileFromStore={store.deleteFile}
      deleteAllFilesFromStore={store.deleteAllFiles} />
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
</style>