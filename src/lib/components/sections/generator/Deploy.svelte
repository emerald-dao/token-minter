<script>
  import { Button, DeploymentButton } from "$lib/components/atoms/index";
  import DeploymentTransaction from '$lib/components/sections/generator/DeploymentTransaction.svelte';
  import { deployContract } from "../../../../flow/actions.js";
	import { transactionInProgress } from "../../../../flow/stores";

  let deploymentOptions = [
    {
      title: "Deploy to Testnet",
      emoji: "🧪",
      description: "Deploy your collection to the Flow test blockchain.",
      onClickAction: () => alert("test"),
      accent: false
    },
    {
      title: "Deploy to Mainnet",
      emoji: "🚀",
      description: "Deploy your collection to the Flow mainnet blockchain.",
      onClickAction: deployContract,
      accent: true
    },
    {
      title: "Download Code",
      emoji: "🔽",
      description: "Download the Cadence contract to your machine.",
      onClickAction: () => alert("download"),
      accent: false
    },
  ];
</script>

<div>
  {#if $transactionInProgress}
    <DeploymentTransaction/>
  {:else}
    {#each deploymentOptions as option}
      <DeploymentButton
        title={option.title}
        emoji={option.emoji}
        description={option.description}
        onClickAction={option.onClickAction}
        accent={option.accent}
      />
    {/each}
  {/if}
</div>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    @include mq(small) {
      flex-direction: row;
      gap: 1em;
      height: 100%;
    }
  }
</style>