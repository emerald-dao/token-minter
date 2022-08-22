<script>
  import { user } from "../../../flow/stores";
  import { Divider, BallButton, Button, Stack } from "$lib/components/atoms/index";
  import { getFindProfile } from "../../../flow/utils";

  let findProfile = getFindProfile("TODO: Change address");
</script>

<Stack direction="column" gap="0.2rem" align="flex-start" justify="center">
  {#await findProfile then profile}
    {#if profile}
      <img src={profile.avatar} alt={`${profile.name} avatar`}>
      <h3>{profile.name}</h3>
      <h4>{profile.address}</h4>
    {:else}
      <img src="https://find.xyz/assets/img/avatars/avatar16.png" alt="default avatar">
      <h3 class="address">{$user.addr}</h3>
      <Button href="https://find.xyz/me/profile" target="_blank" class="small transparent" leftIcon="person-circle">Create Profile</Button>
    {/if}
  {/await}
</Stack>
<Divider line={true} lineWidth="2px" space="3rem" lineColor="var(--clr-accent-main-t9)"/>
<BallButton
  active={true}
  icon="ion:albums"
>
  My Collections
</BallButton>
<Divider space="3rem" />
<Divider line={true} lineWidth="2px" space="2rem" lineColor="var(--clr-accent-main-t9)"/>
<Button class="small transparent" leftIcon="add-circle" href="/collection-generator">Create Collection</Button>

<style type="scss">
  img {
    border-radius: 0.6rem;
    margin-bottom: 1rem;
    width: 100%;
  }
  h3 {
    font-size: var(--fs-500);
    margin-bottom: 0.3rem;
  }
  .address {
    font-size: var(--fs-400);
    margin-bottom: 0.8rem;
  }
  h4 {
    font-size: var(--fs-300);
    font-weight: 300;
    color: var(--clr-accent-main-t5)
  }
</style>
