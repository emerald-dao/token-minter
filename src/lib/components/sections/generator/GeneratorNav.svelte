<script>
  import { Stack } from "$lib/components/atoms/index";

  export let step
  export let steps
</script>

<Stack align="flex-start">
  <ul>
    {#each steps as _step, i}
    <Stack direction="row" gap="0.5rem">
      <div 
        class="step-number" 
        class:step-number-active={i === step} 
        class:step-number-passed={i < step}
      >
        {i + 1}
      </div>
      <li 
        class:step-title-active={i === step} 
        class:step-title-passed={i < step}
        on:click={() => step=i}
      >
        {_step.title}
      </li>
    </Stack>
    {/each}
  </ul>
  <div class="description">
    <h5>Description</h5>
    <p>{steps[step].description}</p>
  </div>
</Stack>

<style type="scss">
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
      transition: 0.5s;
    }

    .step-number {
      background: var(--clr-font-text-soft);
      color: var(--clr-font-text-inverse);
      width: 1.2rem;
      height: 1.2rem;
      aspect-ratio: 1/1;
      border-radius: 99px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5em;
      font-weight: 600;
      cursor: pointer;
    }
    .step-number-passed {
      background: var(--clr-primary-main);
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
    }
    .step-number-active {
      background: transparent;
      border: 1px var(--clr-primary-main) solid;
      color: var(--clr-primary-main);
      width: 2rem;
      height: 2rem;
    }
    .step-title-active {
      font-size: var(--fs-500);
      line-height: 1em;
      font-weight: 500;
      color: var(--clr-font-text);
    }
    .step-title-passed {
      color: var(--clr-font-text);
    }
  }

  .description {
    background-color: hsla(0, 0%, 100%, 0.04);
    border-radius: 1rem;
    padding: 1.8rem 1.2rem;
    font-weight: 300;
    width: 100%;

    h5 {
      font-size: var(--fs-300);
      margin-top: 0;
      margin-bottom: 1em;
      font-weight: 500;
      color: var(--clr-primary-main);
    }
   
    p {
      font-size: var(--fs-300);
    }
  }
</style>