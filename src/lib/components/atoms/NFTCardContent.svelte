<script>
  import { NFTPrice, NftImage, Divider } from "$atoms";
  
  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
  export let price;
</script>

<div class="main-wrapper">
  <NftImage thumbnailURL={thumbnailURL} name={name} backgroundColor={backgroundColor} />
  <Divider space="2rem"/>
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