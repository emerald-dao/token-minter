<script>
  import Icon from "@iconify/svelte";

  export let title;
  export let description;
  export let progress = "indeterminate";
  export let progressMessage = "Loading";
  export let icon;
</script>

<span class="transaction-status">
  {#if icon}
    <Icon icon={icon}/>
  {/if}
  {title}
</span>
<span class="transaction-detail">
  {description}
</span>  
{#if progress = "indeterminate"}
  <progress indeterminate>{progressMessage}</progress>
{:else if progress}
  <progress min="0" max="100" value={progress}>{progressMessage}</progress>
{/if}

<style type="scss">
  progress {
    accent-color: var(--clr-accent-main);
    height: 20px;
    margin-top: 2rem;
  }

  .transaction-detail {
    color: var(--clr-font-text-inverse-t6);
    font-size: var(--fs-200);
    line-height: 2.6ch;
  }

  .transaction-status {
    font-family: var(--font-mono);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  span {
    max-width: 25ch;
    text-align: center;
  }
</style>
  