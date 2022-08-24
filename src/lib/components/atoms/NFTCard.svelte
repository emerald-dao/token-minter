<script>
  import {
    TransparentCard,
    Button,
    NFTCardContent,
  } from "$lib/components/atoms/index";

  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
  export let price;
  export let extra;
  export let serial;
  export let purchaseFunction;
  export let buy = false;
  export let withLink = false;
  export let url;
</script>

<TransparentCard padding="0.8em" hoverShadow={true} border={true}>
  {#if withLink}
    <a href={url}>
      <NFTCardContent
        {thumbnailURL}
        {name}
        {description}
        {backgroundColor}
        {price} />
    </a>
  {:else}
    <NFTCardContent
      {thumbnailURL}
      {name}
      {description}
      {backgroundColor}
      {price} />
  {/if}
  {#if buy}
    <Button
      class="small full-width no-shadow ghost"
      on:click={() => purchaseFunction(serial, price)}>
      Buy
    </Button>
  {/if}
</TransparentCard>

<style type="scss">
  a {
    text-decoration: none;
  }
</style>
