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

  const collectionInfo = getContext("collectionInfo");
</script>

<Stack direction="column" gap="0.2rem" align="flex-start" justify="center">
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
  space="3rem"
  lineColor="var(--clr-accent-main-t9)" />
<BallButton
  active={$page.url.pathname === `/my-collections/${$page.params.collection}`}
  icon="ion:settings"
  href={`/my-collections/${$page.params.collection}`}>
  General
</BallButton>
<BallButton
  active={false}
  icon="ion:eye"
  href={`/discover/${$user.addr}/${$page.params.collection}`}>
  View Collection
</BallButton>
<BallButton
  active={$page.url.pathname ===
    `/my-collections/${$page.params.collection}/airdrop`}
  icon="ion:gift"
  href={`/my-collections/${$page.params.collection}/airdrop`}>
  Airdrop
</BallButton>
<Divider space="3rem" />
<BallButton icon="ion:trash" danger={true}>Remove</BallButton>
<Divider
  line={true}
  lineWidth="2px"
  space="2rem"
  lineColor="var(--clr-accent-main-t9)" />
<Button
  class="small transparent"
  leftIcon="arrow-back-circle"
  href="/my-collections">Back to My Collections</Button>

<style type="scss">
  h3 {
    font-size: var(--fs-400);
    margin-bottom: 0.3rem;
    margin-top: 1.2rem;
  }
</style>
