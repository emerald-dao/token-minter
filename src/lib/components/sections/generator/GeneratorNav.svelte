<script>
  import { StepDescription } from "$lib/components/atoms/index"
  import { NavigationStep } from "$lib/components/atoms/index"

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
      <NavigationStep 
        active={step === i} 
        clickable={step > i} 
        passed={step > i}
        number={i + 1}
        on:click={() => goToStep(i)}
      >
        {#if i === step}
          {_step.emoji}
        {/if}
        {_step.title}
      </NavigationStep>
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
  }
</style>