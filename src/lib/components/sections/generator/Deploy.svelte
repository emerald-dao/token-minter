<script>
  import { Button, CollectionPreview, Stack } from "$atoms";
  import DeploymentTransaction from '$components/sections/generator/DeploymentTransaction.svelte';
  import { deployToMainnet, deployToTestnet } from "$flow/actions.js";
	import { transactionInProgress } from "$stores/FlowStore";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
</script>


<GeneratorStepLayout>
  <div slot="main-content">    
    {#if $transactionInProgress}
      <DeploymentTransaction/>
    {:else}
      <CollectionPreview/>
    {/if}
  </div>
  <Stack slot="buttons" direction="row ">
    <Button on:click={deployToTestnet} leftIcon="flask" class="ghost">
      Deploy to Testnet
    </Button>
    <Button on:click={deployToMainnet} leftIcon="rocket">
      Deploy to Mainnet
    </Button>
    </Stack>
</GeneratorStepLayout>
