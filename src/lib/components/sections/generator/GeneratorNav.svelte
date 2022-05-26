<script>
  import { Stack } from "$lib/components/atoms/index";

  export let step
  export let steps
</script>

<div class="main-wrapper">
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
</div>

<style type="scss">
  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    height: 100%;
  }

  ul {
    background-color: hsla(0, 0%, 100%, 0.03);
    border-radius: 1rem;
    padding: 1.8rem 1.2rem;
    margin-top: 0;
    font-weight: 300;
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: var(--fs-200);
    color: var(--clr-font-text-soft);
    height: auto;
    
    li {
      cursor: pointer;
      margin-block: 0.8em;
      font-size: var(--fs-300);
      font-weight: 400;
      transition: 0.6s;
    }

    .step-number {
      color: var(--clr-font-text-soft);
      border: 1px var(--clr-font-text-soft) solid;
      width: 1rem;
      height: 1rem;
      aspect-ratio: 1/1;
      border-radius: 99px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1em;
      font-weight: 600;
      transition: 0.5s;
      cursor: pointer;
    }
    .step-number-passed {
      color: var(--clr-primary-main);
      border: 1px var(--clr-primary-main) solid;
      cursor: pointer;
    }
    .step-number-active {
      background: var(--clr-primary-main);
      color: var(--clr-font-text-inverse);
      border: none;
      margin-left: 0.3rem;
    }
    .step-title-active {
      line-height: 1em;
      color: var(--clr-primary-main);
      transition: 0.6s;
    }
  }

  .description {
    background-color: hsla(0, 0%, 0%, 0.08);
    border-radius: 1rem;
    padding: 1.5rem 1.2rem;
    font-weight: 300;
    width: 100%;
    height: 100%;
    transition: 0.5s;

    h5 {
      font-size: var(--fs-300);
      margin-top: 0;
      margin-bottom: 1em;
      font-weight: 500;
      color: var(--clr-primary-main);
    }
   
    p {
      font-size: var(--fs-200);
    }
  }
</style>