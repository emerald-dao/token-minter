<script>
  import { TransparentCard, Stack, LoadingSpinner } from "$lib/components/atoms/index";
  import Icon from "@iconify/svelte";

  export let uploadState = "to-upload"
  export let initialToken = 0;
  export let lastToken = 500;
  let iconWidth = "1.7em"
</script>

<TransparentCard height="fit-content" accent={uploadState === "to-upload" || uploadState === "loading"}>
  <Stack direction="row" justify="space-between">
    <span>
      {`NFT ${initialToken} to ${lastToken}`}
    </span>

    {#if uploadState === "uploaded"}
      <Icon 
        color="var(--clr-primary-soft)" 
        icon="ion:checkmark-circle" 
        width={iconWidth}
      />
    {:else if uploadState === "to-upload"}
      <button on:click={() => uploadState = "loading" } class="beat">
        <Icon 
          color="var(--clr-accent-strong)" 
          icon=ion:arrow-up-circle
          width={iconWidth}
        />
      </button>
    {:else if uploadState === "loading"}
      <LoadingSpinner 
        color="var(--clr-accent-strong)" 
        iconWidth={iconWidth}
      />
    {:else if uploadState === "waiting"}
      <Icon 
        color="var(--clr-neutral-300)" 
        icon=ion:arrow-up-circle
        width={iconWidth}
      />
    {/if}
  </Stack>
</TransparentCard>

<style>
  span {
    font-size: var(--fs-300);
    font-weight: 400;
    background-color: var(--clr-accent-main-t9);
    color: var(--clr-accent-strong);
    padding: 0.3em 1.2em;
    border-radius: 0.4em;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @keyframes beat {
    0%{
      -webkit-transform: scale(1);
    }
    50%{
      -webkit-transform: scale(1.1);
    }
    100%{
      -webkit-transform: scale(1);
    }
  }

  .beat {
    animation: beat 2s linear infinite;
  }
</style>

