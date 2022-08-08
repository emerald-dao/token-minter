<script>
  import { TransparentCard, Button, NFTCardContent } from "$lib/components/atoms/index";

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
  
  // TODO: make this dynamic
  export let collection = {
    name: "MyAwesomeCollection",
    description: "Collection description",
    address: "0x8f9e8e0dc951c5b9"
  };
</script>

<TransparentCard padding="0.8em" accent={true}>
  {#if withLink}
    <a href={`/discover/${collection.address}/${collection.name}/${serial}`}>
      <NFTCardContent thumbnailURL={thumbnailURL} name={name} description={description} backgroundColor={backgroundColor} price={price}/>
    </a>
  {:else}
    <NFTCardContent thumbnailURL={thumbnailURL} name={name} description={description} backgroundColor={backgroundColor} price={price}/>
  {/if}
  {#if buy}
    <Button class="small full-width no-shadow ghost" on:click={() => purchaseFunction(serial, price)}>
      Buy
    </Button>
  {/if}
</TransparentCard>

<style type="scss">
  a {
    text-decoration: none;
  }
</style>
