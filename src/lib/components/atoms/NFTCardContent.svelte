<script>
  import { NFTPrice } from "$lib/components/atoms/index";

  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
  export let price;
</script>

<div class="main-wrapper">
  <img
  class="thumbnail"
  src={thumbnailURL}
  alt={`${name} image`}
  style={`background-color: ${backgroundColor};`} />
  <div class="content">
    <h4>{name}</h4>
    {#if description}
    <p class="description">{description}</p>
    {/if}
    {#if price}
      <NFTPrice price={price}/>
    {/if}
  </div>
</div>

<style type="scss">
  .main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .thumbnail {
      margin-bottom: 1.2em;
      border-radius: 0.4rem;
    }

    .content {
      margin-bottom: 1.2em;

      h4 {
        font-size: var(--fs-400);
        font-weight: 600;
        text-shadow: none;
        margin-bottom: 0.4em;
        margin-top: 0;
        color: var(--clr-accent-main);
      }
      .description {
        font-size: var(--fs-300);
        color: var(--clr-font-text-soft);
        margin-bottom: 1em;
      }
    }
  }
</style>