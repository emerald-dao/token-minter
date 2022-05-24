<script>
  import { Stack } from "$lib/components/atoms/index";

  export let step
  export let steps
</script>

<div>
  <!-- <Stack direction="row" gap="0.7rem">
    <div class="step-number">{step + 1}</div>
    <h1>{steps[step].title}</h1>
  </Stack> -->
  <ul>
    {#each steps as _step, i}
    <Stack direction="row" gap="0.5rem">
      <div class="step-number" class:step-number-active={i === step}>{i + 1}</div>
      <li class:step-title-active={i === step} on:click={() => step=i}>{_step.title}</li>
    </Stack>
    {/each}
  </ul>
  <p>{steps[step].description}</p>
</div>

<style type="scss">
  .step-number {
    background: linear-gradient(142deg, var(--clr-primary-main) 0%, var(--clr-accent-main) 100%);
    color: var(--clr-font-text-inverse);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-weight: 600;
  }

  p {
    font-size: var(--fs-300);
    margin-top: 3.4rem;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-size: var(--fs-200);
    color: var(--clr-font-text-soft);
    
    li {
      cursor: pointer;
      margin-block: 0.3em;
    }

    .step-number {
      background: var(--clr-font-text-soft);
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
    }
    .step-number-active {
      background: var(--clr-primary-main);
      width: 1.6rem;
      height: 1.6rem;
    }
    .step-title-active {
      font-size: var(--fs-400);
      font-weight: 500;
      color: var(--clr-primary-main);
    }
  }
</style>