<script>
  import { Button, LoadingSpinner } from "$atoms";
  import {
    activeStep,
  } from "$stores/ActiveStepStore";
  import Icon from "@iconify/svelte";
  import generatorSteps from '$lib/config/generatorSteps'

  $: step = generatorSteps[$activeStep];
  export let errors;
  export let submit = false;

  let iconWidth = "1.5em";
</script>

{#if step.button}
  <!-- Buttons for form submitting -->
  {#if submit}
    <!-- If error object is given -->
    {#if errors}
      {#if Object.values(errors).every((element) => element === null)}
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
  {:else if step.state === "active" || step.state === "inactive"}
    <Button on:click={activeStep.onNext}>
      <Icon
        color="var(--clr-font-text-inverse)"
        icon={`ion:${step.button.active.icon}`}
        width={iconWidth} />
      {step.button.active.text}
    </Button>
  {:else if step.state === "ready"}
    <Button on:click={activeStep.onNext}>
      {step.button.active.text}
    </Button>
  {:else if step.state === "loading"}
    <Button on:click={activeStep.onNext} disabled class="loading">
      <LoadingSpinner color="var(--clr-font-text-inverse)" {iconWidth} />
      {step.button.loading.text}
    </Button>
  {:else if step.state === "success"}
    <Button on:click={activeStep.onNext} disabled class="disabled">Uploaded</Button>
  {/if}
{/if}
