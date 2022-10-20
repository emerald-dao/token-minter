<script>
  import { TransparentCard, Button, NFTCardContent } from "$atoms";

  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
  export let price;
  export let buy = false;
  export let withLink = false;
  export let url;
  export let purchase;
  export let flowPrice;
  export let paymentType;
  export let ownedByUser = false;
  export let supply = 1;
  export let serial;
</script>

<TransparentCard padding="0.8em" hoverShadow={true} border={true}>
  {#if withLink}
    <a class="content-wrapper" href={url}>
      <NFTCardContent
        {flowPrice}
        {thumbnailURL}
        {name}
        {description}
        {backgroundColor}
        {price}
        {paymentType}
        {supply}
        {serial} />
      {#if buy}
        <Button class="small full-width no-shadow accent-color">Buy Now</Button>
      {:else if !ownedByUser}
        <Button class="small full-width no-shadow ghost done">Sold</Button>
      {/if}
    </a>
  {:else}
    <div class="content-wrapper">
      <NFTCardContent
        {flowPrice}
        {thumbnailURL}
        {name}
        {description}
        {backgroundColor}
        {price}
        {paymentType}
        {supply}
        {serial} />
      {#if purchase}
        <Button
          class="small full-width no-shadow accent-color"
          on:click={purchase}>Buy Now</Button>
      {/if}
    </div>
  {/if}
</TransparentCard>

<style type="scss">
  a {
    text-decoration: none;
  }

  .content-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
