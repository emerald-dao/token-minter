<script>
  import {
    TransparentCard,
    Stack,
    LoadingSpinner,
    Button
  } from "$lib/components/atoms/index";
  import Icon from "@iconify/svelte";
  import {
    uploadMetadataToContract,
    getNextMetadataId,
  } from "../../../flow/actions";
  import { contractInfo, user } from "../../../flow/stores";
  import { csvMetadata } from "$lib/stores/generator/CsvStore.ts";
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let uploadState = "to-upload";
  export let initialToken = 0;
  export let lastToken = 499;
  export let batchSize = 500;
  let iconWidth = "1.5em";

  const onUpload = async () => {
    uploadState = "loading";

    const contractName = $contractInfo.name.replace(/\s+/g, "");
    // Fetches the next metadata we are supposed to upload to the contract
    const nextMetadataId = await getNextMetadataId(contractName, $user.addr);
    // Makes sure we are on the correct step
    if (nextMetadataId !== initialToken) {
      uploadState = "error";
      console.log("The NFTs to upload do not match.");
      return;
    }
    // Gets the batch of metadata we want to upload
    const metadatas = $csvMetadata.slice(initialToken, lastToken + 1);
    const uploadResult = await uploadMetadataToContract(
      contractName,
      metadatas,
      batchSize
    );
    if (uploadResult.success) {
      uploadState = "uploaded";
      dispatch('uploaded');
    } else {
      uploadState = "error";
    }
  };
</script>

<TransparentCard
  height="fit-content"
  accent={uploadState === "to-upload" || uploadState === "loading"}>
  <Stack direction="row" justify="space-between">
    <Stack direction="row" align="center">
      <span class="nfts-numbers">
        {`NFT ${initialToken} to ${lastToken}`}
      </span>
      {#if uploadState === "error"}
        <Stack direction="row" align="center" gap="0.4em">
          <Icon
            icon="ion:alert-circle-outline"
            width="1em"
            color="red"
          />
          <span class="error">
            There was an error while uploading metadata. Please try again.
          </span>
        </Stack>
      {/if}
    </Stack>
      {#if uploadState === "to-upload" || uploadState === "error"}
        <Button class="small no-shadow" on:click={onUpload}>
          <Icon
            icon="ion:arrow-up-circle"
            color="var(--clr-font-text-inverse)"
            width={iconWidth} />
          Upload
        </Button>
      {:else if uploadState === "waiting"}
        <Button class="small no-shadow waiting">
          <Icon
            icon="ion:arrow-up-circle"
            color="var(--clr-font-text-inverse)"
            width={iconWidth} />
          Waiting
        </Button>
      {:else if uploadState === "loading"}
        <Button class="small no-shadow loading">
          <LoadingSpinner color="var(--clr-font-text-inverse)" {iconWidth} />
          Uploading
        </Button>
      {:else if uploadState === "uploaded"}
        <Button class="small no-shadow waiting">
          <Icon
            icon="ion:checkmark-circle"
            color="var(--clr-font-text-inverse)"
            width={iconWidth}
          />
        Uploaded
        </Button>
      {/if}
  </Stack>
</TransparentCard>

<style type="scss">
  .nfts-numbers {
    font-size: var(--fs-300);
    font-weight: 400;
    background-color: var(--clr-accent-main-t9);
    color: var(--clr-accent-strong);
    padding: 0.3em 1.2em;
    border-radius: 0.4em;
  }
</style>
