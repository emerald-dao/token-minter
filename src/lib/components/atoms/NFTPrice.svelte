<script>
  import { Stack } from "$atoms";

  export let price;
  export let width = "20px";
  export let fontSize = "var(--fs-300)";
  export let currentPrice = false;
  export let flowPrice;
  export let paymentType = "$FLOW";

  console.log(paymentType);
</script>

<div style={`font-size: ${fontSize}`}>
  <Stack direction="column" align="flex-start" gap="0">
    {#if currentPrice}
      <span>Current price</span>
    {/if}
    <Stack direction="row" gap="0.5em">
      <Stack direction="row" gap="0.4em">
        <img
          src={paymentType === "$FUSD" ? "/fusd-logo.png" : "/flow-logo.png"}
          alt="flow coin logo"
          style={`width: ${width}`} />
        <p class="price" style={`font-size: ${fontSize}`}>
          {Number(price)}
        </p>
      </Stack>
      {#if flowPrice && paymentType === "$FLOW"}
        <p class="price-dollars">
          {`(USD ${(Number(price) * flowPrice).toFixed(1)})`}
        </p>
      {:else if paymentType === "$FUSD"}
        <p class="price-dollars">
          {`(USD ${Number(price)})`}
        </p>
      {/if}
    </Stack>
  </Stack>
</div>

<style type="scss">
  span {
    color: var(--clr-font-text-soft-t5);
    font-size: 0.6em;
  }

  .price {
    color: var(--clr-font-text);
    font-weight: 600;
  }

  .price-dollars {
    color: var(--clr-accent-main-t3);
    font-weight: 600;
    font-size: var(--fs-100);
  }
</style>
