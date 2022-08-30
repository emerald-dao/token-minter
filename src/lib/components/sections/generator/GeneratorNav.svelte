<script>
  import { BallButton, Button, Divider } from "$atoms"
  import { newCollection } from "$stores/ActiveStepStore";

  export let step;
  export let steps;
  
  const goToStep = (i) => {
    // Allow navigation only to eligible steps
    if ((step - steps[step].allowToGoBack) === i) step = i;
  };
</script>

<ul>
  {#each steps as _step, i}
    <BallButton 
      active={step === i} 
      passed={step > i}
      number={i + 1}
      on:click={() => goToStep(i)}
      clickable={(step - steps[step].allowToGoBack) === i}
      >
      {#if i === step}
        {_step.emoji}
      {/if}
      {_step.title}
    </BallButton>
  {/each}
</ul>
<Divider line={true} lineWidth="2px" space="2rem" lineColor="var(--clr-accent-main-t9)"/>
<Button class="small transparent" leftIcon="refresh-circle" on:click={newCollection}>Restart</Button>

<style type="scss">
  ul {
    padding: 0 0 1rem 0;
    margin: 0 0 1rem 0;
  }
</style>