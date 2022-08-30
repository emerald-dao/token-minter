<script>
  import { dappTitle } from "$lib/config/config";
  import { Button, CollectionCard, Stack } from "$atoms";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
  import { newCollection } from "$stores/ActiveStepStore";
  import { user } from "$stores/FlowStore";
  import { contractInfo } from "$stores/ContractStore";
  import { resultCID } from "$stores/IPFSstore";
</script>

<GeneratorStepLayout>
  <Stack slot="main-content" direction="column" align="start">
    <div>
      <h3>Thank You!</h3>
      <p>{`Thanks for uploading your collection with ${dappTitle}.`}</p>
    </div>
    <CollectionCard
      name={$contractInfo.name}
      url={`/${$user.addr}/${$contractInfo.contractName}`}
      thumbnailURL={`https://nftstorage.link/ipfs/${$resultCID}/${$contractInfo.imageName}`}
      description={$contractInfo.description}
      owner={$user.addr} />
  </Stack>
  <Button slot="buttons" on:click={newCollection} leftIcon="add-circle">
    Create new collection
  </Button>
</GeneratorStepLayout>

<style type="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    height: 100%;
  }
</style>
