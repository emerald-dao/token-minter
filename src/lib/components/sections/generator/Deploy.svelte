<script>
  import { DeploymentButton } from "$lib/components/atoms/index";
  import DeploymentTransaction from '$lib/components/sections/generator/DeploymentTransaction.svelte';
  import { deployToMainnet, deployToTestnet } from "../../../../flow/actions.js";
	import { transactionInProgress, contractCode, contractInfo } from "../../../../flow/stores";

  let deploymentOptions = [
    {
      title: "Deploy to Testnet",
      emoji: "🧪",
      description: "Deploy your collection to the Flow test blockchain.",
      onClickAction: deployToTestnet,
      accent: false
    },
    {
      title: "Deploy to Mainnet",
      emoji: "🚀",
      description: "Deploy your collection to the Flow mainnet blockchain.",
      onClickAction: deployToMainnet,
      accent: true
    },
    {
      title: "Download Code",
      emoji: "🔽",
      description: "Download the Cadence contract to your machine.",
      onClickAction: "download",
      accent: false
    },
  ];
</script>

<div>
  {#if $transactionInProgress}
    <DeploymentTransaction/>
  {:else}
    {#each deploymentOptions as option}
      {#if option.onClickAction === "download"}
        <a href={`data:text/plain;charset=utf-8, ${encodeURIComponent($contractCode)}`} download={`${$contractInfo.name}.cdc`}>
          <DeploymentButton
            title={option.title}
            emoji={option.emoji}
            description={option.description}
            accent={option.accent}
          />
        </a>
      {:else}
        <DeploymentButton
          title={option.title}
          emoji={option.emoji}
          description={option.description}
          onClickAction={option.onClickAction}
          accent={option.accent}
        />
      {/if}
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

    a {
      text-decoration: none;
    }
    
    @include mq(small) {
      flex-direction: row;
      gap: 1em;
      height: 100%;
    }
  }
</style>