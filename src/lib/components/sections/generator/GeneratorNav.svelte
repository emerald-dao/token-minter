<script>
  import { StepDescription } from "$lib/components/atoms/index"

  export let step;
  export let steps;

  const goToStep = (i) => {
    // Allow navigation only to previous steps
    if (i < step) step = i;
  };
</script>

<div class="main-wrapper">
  <ul>
    {#each steps as _step, i}
      <li 
        class:li-active={i === step} 
        class:li-clickable={i < step}
        on:click={() => goToStep(i)}
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
  @use "../../../styles/abstracts" as *;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    
  }

  ul {
    // TODO: Apply dynamic colors
    background-color: hsla(234, 67%, 40%, 0.5);
    border-radius: 1rem;
    margin-top: 0;
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: var(--fs-200);
    color: var(--clr-font-text-soft);
    padding-inline: 1rem;
    
    @include mq(medium) {
      padding: 1.8rem 1.2rem;
      // TODO: Apply dynamic colors
      background-color: hsla(0, 0%, 100%, 0.03);
    }
    
    li {
      display: none;
      font-size: var(--fs-400);
      font-weight: 400;
      transition: 0.6s;
      flex-direction: row;
      align-items: center;
      gap: 0.5em;
      border-radius: 0.5em;
      padding-block: 0.4em;
      margin-block: 0.2em;
      transition: 0.4s;
      
      @include mq(medium) {
        display: flex;
        font-size: var(--fs-300);
      }
    }

    .li-active {
      display: flex;
      color: var(--clr-accent-main);
      
      @include mq(medium) {
        line-height: 1em;
        transition: 0.6s;
        // TODO: Apply dynamic colors
        background-color: hsla(234, 67%, 40%, 0.5);
      }
    }
    .li-clickable {
      cursor: pointer;
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
      background-color: var(--clr-accent-hover);
      color: var(--clr-font-text);
      border: none;
      margin-left: 0.3rem;
    }
  }
</style>