<script>
  import {
		Stack
	} from "$atoms";

  export let title;
  export let description;
  export let background = false;
  export let center = false;
</script>

<div class:with-background={background} class:center={center} class="main-wrapper">
  <div class="row" class:column={center}>
    <slot/>
    <h4>
      {title}
    </h4>
  </div>
  <p>
    {@html description}
  </p>
</div>

<style type="scss">
  .main-wrapper {
    margin-bottom: 2.4rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 0.8rem;
  }
  .column {
    flex-direction: column;
    gap: 1.5rem;
  }
  h4 {
    font-size: var(--fs-500);
    font-weight: 900;
    color: var(--clr-accent-main);
  }
  p {
    font-size: var(--fs-300);
    margin-top: 1.6em;
    color: var(--clr-font-text-soft);
    max-width: 43ch;
  }

  .with-background {
    border-radius: 1rem;
		background-color: var(--clr-background-primary);
    padding: 2.4rem;
    border: 1px var(--clr-accent-main-t8) solid;
    box-shadow: 0 0 10px 0 var(--clr-background-primary-t4);
  }
  
  .center {
    text-align: center;
  }
</style>