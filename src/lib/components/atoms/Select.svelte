<script>
  export let value;
</script>

<div class="select">
  <select on:change bind:value>
    <slot />
  </select>
</div>

<style type="scss">
  select {
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    color: var(--clr-accent-main);

    // Stack above custom arrow
    z-index: 1;

    // Remove dropdown arrow in IE10 & IE11
    // @link https://www.filamentgroup.com/lab/select-css.html
    &::-ms-expand {
      display: none;
    }

    // Remove focus outline, will add on alternate element
    outline: none;
  }

  .select {
    display: grid;
    grid-template-areas: "select";
    align-items: center;
    position: relative;

    select,
    &::after {
      grid-area: select;
    }

    // min-width: 15ch;
    // max-width: 30ch;

    border: 2px solid var(--clr-accent-main);
    border-radius: 0.5rem;
    padding: 0.27em 0.5em;

    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;

    // Custom arrow
    &:not(.select--multiple)::after {
      content: "";
      justify-self: end;
      width: 0.5em;
      height: 0.3em;
      background-color: var(--clr-accent-main);
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }
  }
</style>
