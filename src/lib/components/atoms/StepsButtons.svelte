<script>
  import { Button, LoadingSpinner } from "$lib/components/atoms/index"; 
  import { onNext } from "$lib/stores/generator/updateFunctions.js";
  import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";

  $: step = $stepsArray[$activeStep];
  export let errors;
  export let submit = false;

  let onClick = () => {
    if (step.onSubmitAction) {
      onNext(step.onSubmitAction);
    } else {
      onNext();
    }
  }
</script>

<!-- Buttons for form submitting -->
{#if submit}
  <!-- If error object is given -->
  {#if errors}
    {#if Object.values(errors).every(element => element === null)}
      <Button type="submit">
        {step.buttonTexts.active}
      </Button>
    {:else}
      <Button type="submit" disabled class="disabled">
        {step.buttonTexts.active}
      </Button>	
    {/if}
  <!-- Without error object -->
  {:else}
    <Button type="submit">
      {step.buttonTexts.active}
    </Button>
  {/if}
<!-- Buttons that do not submit forms -->
{:else}
  {#if step.state === "active" || step.state === "inactive"}
    <Button on:click={onClick} >
      {step.buttonTexts.active}
    </Button>
  {:else if step.state === "ready"}
    <Button on:click={onClick}>
      {step.buttonTexts.active}
    </Button>
  {:else if step.state === "loading"}
    <Button on:click={onClick} disabled>
      <LoadingSpinner/>
      {step.buttonTexts.loading}
    </Button>
  {:else if step.state === "success"}
    <Button on:click={onClick} disabled class="disabled">
      Uploaded
    </Button>
  {/if}
{/if}