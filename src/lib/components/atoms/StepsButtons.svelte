<script>
  import { Button, LoadingSpinner } from "$lib/components/atoms/index"; 
  import { onNext } from "$lib/stores/generator/updateFunctions.js";
  import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";
  import Icon from "@iconify/svelte";

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

  let iconWidth = "1.5em";
</script>

{#if step.button}
  <!-- Buttons for form submitting -->
  {#if submit}
    <!-- If error object is given -->
    {#if errors}
      {#if Object.values(errors).every(element => element === null)}
        <Button type="submit">
          {step.button.active.text}
        </Button>
      {:else}
        <Button type="submit" disabled class="disabled">
          {step.button.active.text}
        </Button>	
      {/if}
    <!-- Without error object -->
    {:else}
      <Button type="submit">
        {step.button.active.text}
      </Button>
    {/if}
  <!-- Buttons that do not submit forms -->
  {:else}
    {#if step.state === "active" || step.state === "inactive"}
      <Button on:click={onClick} >
        <Icon
        color="var(--clr-font-text-inverse)"
        icon={`ion:${step.button.active.icon}`}
        width={iconWidth} />
        {step.button.active.text}
      </Button>
    {:else if step.state === "ready"}
      <Button on:click={onClick}>
        {step.button.active.text}
      </Button>
    {:else if step.state === "loading"}
      <Button on:click={onClick} disabled class="loading">
        <LoadingSpinner color="var(--clr-font-text-inverse)" {iconWidth}/>
        {step.button.loading.text}
      </Button>
    {:else if step.state === "success"}
      <Button on:click={onClick} disabled class="disabled">
        Uploaded
      </Button>
    {/if}
  {/if}
{/if}