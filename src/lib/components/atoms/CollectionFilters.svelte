<script>
  import {
    TransparentCard,
    Divider,
    Stack
  } from "$atoms";
  import Icon from "@iconify/svelte";

  export let seeMine;
  export let maxPrice;
  export let minPrice;
</script>

<div class="filters-wrapper">
  <TransparentCard height="fit-content">
    <Stack direction="row" gap="0.3rem">
      <Icon icon="ion:filter-circle" color="var(--clr-accent-main-t3)" width="2rem"/>
      <h4>
        Filters
      </h4>
    </Stack>
    <Divider line={true} space="3.4rem" lineColor="var(--clr-accent-main-t9)" lineWidth="1px"/>
    <label for="price">
      Price
      <Stack direction="row" gap="0.5rem" justify="center">
        <input 
          name="min-price"
          id="min-price"
          type="number"
          placeholder="Min"
          min="0"
          max={`${maxPrice}`}
          bind:value={minPrice} />
        to
        <input 
          name="max-price"
          id="max-price"
          type="number"
          placeholder="Max"
          min={`${minPrice === undefined ? 0 : minPrice}`}
          bind:value={maxPrice} />
      </Stack>
    </label>
    <Divider line={true} space="3.4rem" lineColor="var(--clr-accent-main-t9)" lineWidth="1px"/>
    <label for="my-purchases" class="checkbox-label">
      <input
        name="my-purchases"
        id="my-purchases"
        type="checkbox"
        bind:checked={seeMine} />
      My Purchases
    </label>
  </TransparentCard>
</div>

<style type="scss">
  @use "../../styles/abstracts" as *;

  div {
    height: fit-content;

    @include mq(small) {
      position: sticky;
      top: 6rem;
      left: 0;
    }
    
    h4 {
      font-size: var(--fs-400);
      color: var(--clr-accent-main-t3);
    }

    label {
      font-size: var(--fs-300);

      input {
        font-size: var(--fs-200);
        padding: 0.4em;
      }
    }
  }
</style>