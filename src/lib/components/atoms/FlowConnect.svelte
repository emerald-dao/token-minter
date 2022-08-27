<script>
  import Button from "./Button.svelte";
  import { logIn, unauthenticate } from "../../../flow/actions.js";
  import { user } from "../../../flow/stores.js";
  import { getFindProfile } from "../../../flow/utils";

  let findProfile = getFindProfile($user?.addr);
</script>

{#if $user?.loggedIn}
  <Button class="medium ghost" on:click={unauthenticate}>
    <div class="conection-circle pulse" />
    {#await findProfile then profile}
      {#if profile}
        {profile.name}
      {:else}
        {$user.addr}
      {/if}
    {/await}
  </Button>
{:else}
  <Button class="medium" on:click={logIn}>Connect</Button>
{/if}

<style type="scss">
  .conection-circle {
    width: 0.5em;
    height: 0.5em;
    border-radius: 99999px;
    background-color: var(--clr-primary-main);
  }
  @keyframes pulse {
    70% {
      -webkit-transform: scale(1.1);
      box-shadow: 0 0 0 1px var(--clr-primary-main-t6);
    }
    100% {
      -webkit-transform: scale(1);
      box-shadow: 0 0 0 3px var(--clr-primary-main-t9);
    }
  }

  .pulse {
    animation-name: pulse;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
    animation-duration: 1.3s;
    animation-delay: 2s;
  }
</style>
