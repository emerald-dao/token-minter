<script>
  import Button from "./Button.svelte"
  import { logIn, unauthenticate } from "../../../flow/actions.js";
  import { user } from "../../../flow/stores.js";
</script>


{#if $user?.loggedIn}
  <Button class="small ghost" on:click={unauthenticate}>Disconnect</Button>
{:else}
  <Button class="small" on:click={logIn}>Connect</Button>
{/if}