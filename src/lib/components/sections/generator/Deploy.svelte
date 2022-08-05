<script>
  import { Button, CollectionPreview, Stack } from "$lib/components/atoms/index";
  import DeploymentTransaction from '$lib/components/sections/generator/DeploymentTransaction.svelte';
  import { deployToMainnet, deployToTestnet } from "../../../../flow/actions.js";
	import { transactionInProgress, contractCode, contractInfo } from "../../../../flow/stores";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
</script>

{#if $transactionInProgress}
  <DeploymentTransaction/>
{:else}
  <GeneratorStepLayout>
    <CollectionPreview slot="main-content"/>
    <Stack slot="buttons" direction="row ">
      <Button on:click={deployToTestnet} leftIcon="flask" class="ghost">
        Deploy to Testnet
      </Button>
      <Button on:click={deployToMainnet} leftIcon="rocket">
        Deploy to Mainnet
      </Button>
    </Stack>
  </GeneratorStepLayout>
{/if}