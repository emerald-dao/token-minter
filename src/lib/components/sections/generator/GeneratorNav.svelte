<script>
  import { StepInstructions, NavigationStep, TransparentCard } from "$lib/components/atoms/index"

  export let step;
  export let steps;

  const goToStep = (i) => {
    // Allow navigation only to previous steps
    if (i < step) step = i;
  };
</script>

<div class="main-wrapper">
  <TransparentCard accent={true} height={"fit-content"}>
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
  </TransparentCard>
  <StepInstructions instructions={steps[step].instructions} />
</div>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    gap: 1.5rem
  }

  ul {
    padding: 0;
    margin: 0;
  }
</style>