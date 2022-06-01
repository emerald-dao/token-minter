<script>
  export let fileName;
  export let fileSize;
  export let uploaded = false;
</script>

<div class="drop-zone-file">
  <div class="file-data">
    <h5>{fileName}</h5>
    <span>{fileSize}</span>
  </div>
  {#if uploaded}
    <span>Uploaded</span>
  {:else}
    <span>Failed</span>
  {/if}
</div>

<style type="scss">
  .drop-zone-file {
    display: flex;
    direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 2rem;
    width: 100%;
    border-radius: 0.6rem;
    overflow: hidden;
    // TODO: Apply dynamic colors
    background-color: hsla(234, 67%, 40%, 0.4);
    font-size: var(--fs-200);
    background-size: cover;
    position: relative;

    .file-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }
  }
</style>