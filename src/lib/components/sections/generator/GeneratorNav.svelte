<script>
  import { StepDescription } from "$lib/components/atoms/index"

  export let step
  export let steps
</script>

<div class="main-wrapper">
  <ul>
    {#each steps as _step, i}
      <li 
        class:li-active={i === step} 
        on:click={() => step=i}
      >
        <div 
          class="step-number" 
          class:step-number-active={i === step} 
          class:step-number-passed={i < step}
        >
          {i + 1}
        </div>
        {#if i === step}
          {_step.emoji}
        {/if}
        {_step.title}
      </li>
    {/each}
  </ul>
  <StepDescription description={steps[step].description} />
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
    // TODO: Apply dynamic colors
    background-color: hsla(0, 0%, 100%, 0.03);
    border-radius: 1rem;
    padding: 1.8rem 1.2rem;
    margin-top: 0;
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: var(--fs-200);
    color: var(--clr-font-text-soft);
    
    li {
      cursor: pointer;
      font-size: var(--fs-300);
      font-weight: 400;
      transition: 0.6s;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5em;
      border-radius: 0.5em;
      padding-block: 0.4em;
      margin-block: 0.2em;
      transition: 0.4s;
    }

    .li-active {
      line-height: 1em;
      color: var(--clr-accent-main);
      transition: 0.6s;
      background-color: #0163da44;
    }
    .step-number {
      color: var(--clr-font-text-soft);
      border: 1px var(--clr-font-text-soft) solid;
      width: 2rem;
      height: 2rem;
      border-radius: 99px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      background-color: var(--clr-accent-soft);
      color: var(--clr-font-text);
      border: none;
      margin-left: 0.3rem;
    }
  }
</style>