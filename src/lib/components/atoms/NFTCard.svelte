<script>
  import { TransparentCard, Button } from "$lib/components/atoms/index";

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

<TransparentCard padding="0.8em">
  {#if withLink}
    <a href={`/discover/${collection.address}/${collection.name}/${serial}`}>
      <div class="main-wrapper">
        <img
        src={thumbnailURL}
        alt={`${name} image`}
        style={`background-color: ${backgroundColor};`} />
        <div class="content">
          <h4>{name}</h4>
          {#if description}
          <p class="description">{description}</p>
          {/if}
          {#if price}
          <p class="price">{price}</p>
          {/if}
        </div>
        {#if buy}
        <Button class="small" on:click={() => purchaseFunction(serial, price)}>
          Buy
        </Button>
        {/if}
      </div>
    </a>
  {:else}
    <div class="main-wrapper">
      <img
      src={thumbnailURL}
      alt={`${name} image`}
      style={`background-color: ${backgroundColor};`} />
      <div class="content">
        <h4>{name}</h4>
        {#if description}
        <p class="description">{description}</p>
        {/if}
        {#if price}
        <p class="price">{price}</p>
        {/if}
      </div>
      {#if buy}
      <Button class="small" on:click={() => purchaseFunction(serial, price)}>
        Buy
      </Button>
      {/if}
    </div>
  {/if}
</TransparentCard>

<style type="scss">
  a {
    text-decoration: none;
  }
  .main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    img {
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
      .price {
        font-size: var(--fs-300);
        color: var(--clr-font-text-soft);
        font-weight: 600;
      }
    }
  }
</style>
