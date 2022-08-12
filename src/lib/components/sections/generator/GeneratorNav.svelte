<script>
  import { StepInstructions, NavigationStep, TransparentCard, Button } from "$lib/components/atoms/index"
  import { newCollection } from "$lib/stores/generator/GeneratorGeneralStore";

  export let step;
  export let steps;
  
  const goToStep = (i) => {
    // Allow navigation only to eligible steps
    if ((step - steps[step].allowToGoBack) === i) step = i;
  };
</script>

<div class="main-wrapper">
  <TransparentCard accent={true} height={"fit-content"} paddingBlock="1.8rem">
    <ul>
      {#each steps as _step, i}
          <NavigationStep 
            active={step === i} 
            passed={step > i}
            number={i + 1}
            clickable={(step - steps[step].allowToGoBack) === i}
            on:click={() => goToStep(i)}
          >
            {#if i === step}
              {_step.emoji}
            {/if}
            {_step.title}
          </NavigationStep>
      {/each}
    </ul>
    <Button class="small transparent" leftIcon="refresh-circle" on:click={newCollection}>Restart</Button>
  </TransparentCard>
  {#if steps[step].instructions}
    <StepInstructions instructions={steps[step].instructions} />
  {/if}
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
    padding: 0 0 1rem 0;
    margin: 0 0 1rem 0;
    border-bottom: 2px var(--clr-accent-main-t9) solid;
  }
</style>