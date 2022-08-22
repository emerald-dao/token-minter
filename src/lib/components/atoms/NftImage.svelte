<script>
  import getFileTypeFromURL from "$lib/utilities/getFileTypeFromURL";

  export let thumbnailURL;
  export let name;
  export let backgroundColor;

  const fileType = getFileTypeFromURL(thumbnailURL);
</script>

{#if fileType === "video"}
  <video width="100%" height="100%" autoplay loop muted class="thumbnail">
    <source src={thumbnailURL} type="video/webm" />
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

<style type="scss">
  .thumbnail {
    border-radius: 0.4rem;
    height: 100%;
    width: 100%;
  }
</style>