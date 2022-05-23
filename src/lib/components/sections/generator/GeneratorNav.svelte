<script>
  export let step
  export let steps
</script>

<div>
  <ul>
    {#each steps as _step, i}
      <li on:click={() => step=i}>{_step.title}</li>
    {/each}
  </ul>
  <h1>{steps[step].title}</h1>
</div>

<style type="scss">
  h1 {
    font-size: var(--fs-600);
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 2em
  }
</style>