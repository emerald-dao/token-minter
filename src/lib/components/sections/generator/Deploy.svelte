<script>
  import { Button, CollectionPreview, Stack, TransactionModal } from "$atoms";
  import { deployContract } from "$flow/actions.js";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
</script>

<TransactionModal />
<GeneratorStepLayout>
  <div slot="main-content">
    <!-- {#if $transactionInProgress}
      <DeploymentTransaction/>
    {:else} -->
    <CollectionPreview />
    <!-- {/if} -->
  </div>
  <Stack slot="buttons" direction="row ">
    <Button on:click={deployContract} leftIcon="flask" class="ghost">
      Deploy to Testnet
    </Button>
    <Button href="https://touchstone.city/" leftIcon="rocket">
      Deploy to Mainnet
    </Button>
  </Stack>
</GeneratorStepLayout>
