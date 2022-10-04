<script>
  import { NFTPrice, NftImage, Divider } from "$atoms";

  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
  export let price;
  export let flowPrice;
  export let paymentType;
</script>

<div class="main-wrapper">
  <NftImage {thumbnailURL} {name} {backgroundColor} />
  <Divider space="2rem" />
  <div class="content">
    <div>
      <h4>{name}</h4>
      {#if description}
        <p class="description">
          {description.length > 200
            ? description.substring(0, 200) + "..."
            : description}
        </p>
      {/if}
    </div>
    {#if price}
      <NFTPrice {price} {flowPrice} {paymentType} />
    {/if}
  </div>
</div>

<style type="scss">
  .main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    .content {
      margin-bottom: 1em;
      margin-top: 0.6em;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h4 {
        font-size: var(--fs-400);
        font-weight: 600;
        text-shadow: none;
        margin-bottom: 0.6em;
        margin-top: 0;
        color: var(--clr-accent-main);
      }
      .description {
        font-size: var(--fs-200);
        color: var(--clr-font-text-soft);
        margin-bottom: 0.2em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }
  }
</style>
