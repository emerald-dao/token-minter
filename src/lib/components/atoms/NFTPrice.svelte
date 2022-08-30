<script>
  import { Stack } from "$lib/components/atoms/index";

  export let price;
  export let width = "20px";
  export let fontSize = "var(--fs-300)";
  export let currentPrice = false;
</script>

<div style={`font-size: ${fontSize}`}>
  <Stack direction="column" align="flex-start" gap="0">
    {#if currentPrice}
      <span>Current price</span>
    {/if}
    <Stack direction="row" gap="0.4em">
      <img
        src="/flow-logo.png"
        alt="flow coin logo"
        style={`width: ${width}`} />
      <p class="price" style={`font-size: ${fontSize}`}>
        {Number(price).toFixed(3)}
      </p>
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
</style>
