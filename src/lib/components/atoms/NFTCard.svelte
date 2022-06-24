<script>
  import { TransparentCard } from "$lib/components/atoms/index"

  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
</script>

<TransparentCard padding="0.8em">
  <img src={thumbnailURL} alt={`${name} image`} style={`background-color: ${backgroundColor};`}>
  <div class="content">
    <h4>{name}</h4>
    {#if description}
      <p>{description}</p>
    {/if}
  </div>
</TransparentCard>

<style type="scss">
  img {
    margin-bottom: 1.2em;
    border-radius: 0.4rem;
  }
  h4 {
    font-size: var(--fs-200);
    font-weight: 300;
    text-shadow: none;
    margin-bottom: 0.4em;
    margin-top: 0;
    text-align: center;
  }
  p {
    font-size: var(--fs-200);
  }
</style>