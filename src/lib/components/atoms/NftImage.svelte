<script>
  import getFileTypeFromURL from "$lib/utilities/getFileTypeFromURL";

  export let thumbnailURL;
  export let name;
  export let backgroundColor;

  const fileType = getFileTypeFromURL(thumbnailURL);
</script>

{#if thumbnailURL}
  {#if fileType === "video"}
    <video width="auto" height="auto" max-width="100%" max-height="100%" autoplay loop muted class="thumbnail">
      <source src={thumbnailURL} type="video/webm" />
      <source src={thumbnailURL} type="video/mp4" />
      <track kind="captions" />
      Your browser does not support the video tag.
    </video>
  {:else}
    <img
      class="thumbnail"
      src={thumbnailURL}
      alt={`${name} image`}
      style={`background-color: ${backgroundColor};`} />
  {/if}
{:else}
  <div class="placeholder thumbnail" />
{/if}

<style type="scss">
  .thumbnail {
    border-radius: 0.6rem;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .placeholder {
    height: 180px;
    width: auto;
    background-color: var(--clr-accent-main-t8);
  }
</style>
