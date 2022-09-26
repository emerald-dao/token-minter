<script>
  import { getContext } from "svelte";
  import { user } from "$stores/FlowStore";
  import { page } from "$app/stores";
  import {
    Divider,
    BallButton,
    Button,
    Stack,
    NftImage,
    ImagePlaceholder,
  } from "$atoms";
  import { removeContractFromBook } from "$flow/actions";

  const collectionInfo = getContext("collectionInfo");
  const hasEmeraldPass = getContext("emeraldPass");
</script>

<Stack direction="column" gap="0.1rem" align="flex-start" justify="center">
  {#await collectionInfo}
    <ImagePlaceholder />
    <h3>Loading...</h3>
  {:then info}
    <NftImage
      thumbnailURL={`https://nftstorage.link/ipfs/${info.image.cid}/${info.image.path}`}
      name={`${info.name} main image`} />
    <h3>{info.name}</h3>
  {/await}
</Stack>
<Divider
  line={true}
  lineWidth="2px"
  space="1.8rem"
  lineColor="var(--clr-accent-main-t9)" />
<Stack direction="column" gap="0rem">
  <BallButton
    active={$page.url.pathname === `/my-collections/${$page.params.collection}`}
    icon="ion:settings"
    href={`/my-collections/${$page.params.collection}`}>
    General
  </BallButton>
  <BallButton
    active={false}
    icon="ion:eye"
    target="_blank"
    href={`/discover/${$user.addr}/${$page.params.collection}`}>
    View Collection
  </BallButton>
  <BallButton
    active={$page.url.pathname ===
      `/my-collections/${$page.params.collection}/upload`}
    icon="ion:upload"
    href={`/my-collections/${$page.params.collection}/upload`}>
    Upload
  </BallButton>
  <BallButton
    active={$page.url.pathname ===
      `/my-collections/${$page.params.collection}/airdrop`}
    icon="ion:gift"
    href={`/my-collections/${$page.params.collection}/airdrop`}>
    Airdrop
  </BallButton>
  <BallButton
    icon="ion:trash"
    danger={true}
    clickable={true}
    on:click={() => removeContractFromBook($page.params.collection)}
    >Remove</BallButton>
  <Divider
    line={true}
    lineWidth="2px"
    space="2rem"
    lineColor="var(--clr-accent-main-t9)" />
  <Button
    class="small transparent"
    leftIcon="arrow-back-circle"
    href="/my-collections">Back to My Collections</Button>
  <Divider
    space="1rem"
    lineColor="var(--clr-accent-main-t9)" />
  {#await hasEmeraldPass then pass}
    {#if !pass}
      <Button
        class="small full-width ghost"
        leftIcon="lock-open"
        target="_blank"
        href="https://pass.ecdao.org/">Get Emerald Pass</Button>
    {/if}
  {/await}
</Stack>

<style type="scss">
  h3 {
    font-size: var(--fs-400);
    margin-bottom: 0.3rem;
    margin-top: 1.2rem;
  }
</style>
