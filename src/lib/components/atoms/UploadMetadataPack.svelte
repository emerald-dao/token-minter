<script>
  import {
    TransparentCard,
    Stack,
    LoadingSpinner,
  } from "$lib/components/atoms/index";
  import Icon from "@iconify/svelte";
  import { uploadMetadataToContract } from "../../../flow/actions";
  import { contractInfo } from "../../../flow/stores";

  export let uploadState = "to-upload";
  export let initialToken = 0;
  export let lastToken = 499;
  let iconWidth = "1.5em";

  const onUpload = async () => {
    uploadState = "loading";
    let uploadResult = await uploadMetadataToContract(
      $contractInfo.name.replace(/\s+/g, "")
    );
    if (uploadResult.success) {
      uploadState = "uploaded";
    } else {
      uploadState = "error";
    }
  };
</script>

<TransparentCard
  height="fit-content"
  accent={uploadState === "to-upload" || uploadState === "loading"}>
  <Stack direction="row" justify="space-between">
    <span class="nfts-numbers">
      {`NFT ${initialToken} to ${lastToken}`}
    </span>

    <button
      class={uploadState}
      on:click={() => onUpload()}
      disabled={!(uploadState === "to-upload")}>
      {#if uploadState === "uploaded"}
        <span>Uploaded</span>
        <Icon
          color="var(--clr-primary-main-t6)"
          icon="ion:checkmark-circle"
          width={iconWidth} />
      {:else if uploadState === "to-upload"}
        <span>Upload</span>
        <Icon
          color="var(--clr-primary-strong)"
          icon="ion:arrow-up-circle"
          width={iconWidth} />
      {:else if uploadState === "loading"}
        <span>Uploading</span>
        <LoadingSpinner color="var(--clr-primary-main-t4)" {iconWidth} />
      {:else if uploadState === "waiting"}
        <span>Waiting</span>
        <Icon
          color="var(--clr-accent-main-t5)"
          icon="ion:arrow-up-circle"
          width={iconWidth} />
      {/if}
    </button>
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

  button {
    border: none;
    background: var(--clr-primary-main-t6);
    cursor: pointer;
    outline: none;
    padding: 0.3em 0.8em;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.4em;
    gap: 0.4em;
    color: var(--clr-primary-strong);

    span {
      font-size: var(--fs-300);
      font-weight: 400;
    }
  }

  .uploaded {
    background: var(--clr-primary-soft-t8);
    color: var(--clr-primary-main-t7);
  }
  .waiting {
    background: var(--clr-accent-main-t9);
    color: var(--clr-accent-main-t5);
  }
  .loading {
    background: var(--clr-primary-main-t8);
    color: var(--clr-primary-main-t4);
  }
</style>
