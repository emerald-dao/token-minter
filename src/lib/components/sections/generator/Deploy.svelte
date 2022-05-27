<script>
  import { Button } from "$lib/components/atoms/index";
  import DeploymentTransaction from '$lib/components/sections/generator/DeploymentTransaction.svelte';
  import { deployContract } from "../../../../flow/actions.js";
	import { transactionInProgress } from "../../../../flow/stores";
</script>

<div>
  {#if $transactionInProgress}
    <DeploymentTransaction/>
  {:else}
    <Button class="small ghost">Download your Code</Button>
    <Button on:click={deployContract} class="small">Deploy to Flow Mainnet</Button>
    <Button class="small ghost">Deploy to Flow Testnet</Button>
  {/if}
</div>

<style type="scss">
  div {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>