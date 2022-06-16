<script>
  export let name;
  export let number;
</script>

<div class="diagram">
  <slot/>
  <p>{`Diagram ${number}. ${name}`}</p>
</div>

<style type="scss">
  .diagram {
    padding: 1em;
    background-color: var(--clr-neutral-300-t9);
    border-radius: 1em;
    margin-block: 1.6em;

    p {
      margin-top: 2em;
      margin-bottom: 0;
      font-size: var(--fs-200);
      color: var(--clr-font-text-soft)
    }
  }
</style>