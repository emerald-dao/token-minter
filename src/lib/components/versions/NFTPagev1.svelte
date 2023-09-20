<script>
  import {
    Section,
    Container,
    Stack,
    WalletAddress,
    NFTPrice,
    Button,
    MadeWithTouchstone,
    NftImage,
    HtmlHead,
    TransactionModal,
  } from "$atoms";
  import { getCollectionInfo, getNFTInfo, purchaseNFT } from "$flow/actions.js";
  import { transactionInProgress, transactionStatus } from "$stores/FlowStore";
  import { page } from "$app/stores";
  import { user } from "$stores/FlowStore";
  import Select from "$lib/components/atoms/Select.svelte";

  async function getInfo() {
    let nftInfo = await getNFTInfo(
      $page.params.collection,
      $page.params.address,
      $page.params.nft
    );
    const collectionInfo = await getCollectionInfo(
      $page.params.collection,
      $page.params.address
    );
    nftInfo.extra["metadataId"] = nftInfo.metadataId;
    const price = nftInfo.price ?? collectionInfo.price;
    console.log({ collectionInfo, nftInfo, price });
    return { collectionInfo, nftInfo, price };
  }

  let checkNftInfo = getInfo();
  let purchased = false; // flag to check if user has bought the NFT
  let serial;

  async function buyNft(price, paymentType) {
    console.log(serial);
    const transactionResult = await purchaseNFT(
      $page.params.nft,
      price,
      serial,
      $page.params.collection,
      $page.params.address,
      paymentType
    );
    if (
      transactionResult &&
      $transactionStatus.status === 4 &&
      $transactionStatus.statusCode === 0
    ) {
      purchased = true;
    }
  }
</script>

<HtmlHead title="Discover" />

<TransactionModal />
<Section class="padding-top-small">
  <Container>
    <div class="main-grid">
      {#await checkNftInfo then info}
        <div class="image-wrapper left-top">
          <NftImage
            thumbnailURL={`https://ifps.io/ipfs/${info.nftInfo.image.cid}/${info.nftInfo.image.path}`}
            name={`${info.nftInfo.name} NFT`} />
        </div>
        <div class="collection-info-wrapper">
          <Stack direction="column" align="flex-start">
            <Stack direction="column" gap="0.6em" align="flex-start">
              <MadeWithTouchstone />
              <WalletAddress address={$page.params.address}>By</WalletAddress>
            </Stack>
            <p>{info.collectionInfo.name}</p>
            <h1>{info.nftInfo.name}</h1>
            <NFTPrice
              price={info.price}
              width="34px"
              fontSize="var(--fs-500)"
              currentPrice={true}
              paymentType={info.collectionInfo.paymentType} />
            <!-- TODO: ADD VERIFIERS AND BLOCK BUY BUTTON IF USER DOESN'T HAVE VERIFIERS -->
            <Select bind:value={serial}>
              <option disabled selected>Select a serial</option>
              {#each Array(Number(info.nftInfo.supply)) as _, index (index)}
                {#if !info.nftInfo.purchasers[index]}
                  <option>{index}</option>
                {:else if info.nftInfo.purchasers[index] === $user.addr}
                  <option disabled>{index} - Sold to You</option>
                {:else}
                  <option disabled
                    >{index} - Sold to {info.nftInfo.purchasers[index]}</option>
                {/if}
              {/each}
            </Select>
            {#if serial === "Select a serial"}
              <Button disabled>Buy NFT</Button>
            {:else if purchased}
              <Button leftIcon="checkmark-circle" done={true}>
                Bought by you
              </Button>
            {:else if !info.nftInfo.purchasers[serial]}
              <Button
                leftIcon="wallet"
                loading={$transactionInProgress}
                on:click={() =>
                  buyNft(info.price, info.collectionInfo.paymentType)}>
                {#if $transactionInProgress}
                  Loading Transaction
                {:else}
                  Buy NFT
                {/if}
              </Button>
            {/if}
            <Button
              class="medium transparent"
              leftIcon="arrow-back-circle"
              href="/discover/{$page.params.address}/{$page.params.collection}"
              >Back to Collection</Button>
          </Stack>
        </div>
        <div class="left-bottom">
          <Stack direction="column" align="flex-start" gap="2rem">
            <Stack direction="column" align="flex-start" gap="0.4em">
              <h4>Description</h4>
              <p>{info.nftInfo.description}</p>
            </Stack>
            <table>
              <tr>
                <th colspan="2">Metadata</th>
              </tr>
              {#each Object.entries(info.nftInfo.extra) as metadataArray}
                <tr>
                  {#each metadataArray as metadata, i}
                    {#if i === 0}
                      <th class="title">{`${metadata}:`}</th>
                    {:else}
                      <th>{metadata}</th>
                    {/if}
                  {/each}
                </tr>
              {/each}
            </table>
          </Stack>
        </div>
      {/await}
    </div>
  </Container>
</Section>

<style type="scss">
  @use "../../../lib/styles/abstracts" as *;

  .main-grid {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    @include mq(medium) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 2rem;
      column-gap: 5rem;
      grid-template-areas:
        "left-top right"
        "left-bottom right";
    }
  }

  .image-wrapper {
    border-radius: 1rem;
    border: 3px var(--clr-accent-soft-t4) solid;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    overflow: hidden;
  }

  .collection-info-wrapper {
    @include mq(medium) {
      grid-area: right;
      position: sticky;
      top: 8rem;
      height: fit-content;
    }
  }

  .left-top {
    @include mq(medium) {
      grid-area: left-top;
    }
  }
  .left-bottom {
    @include mq(medium) {
      grid-area: left-bottom;
    }
  }

  h1 {
    font-size: var(--fs-700);
  }

  h4 {
    padding-bottom: 0.2em;
    font-size: var(--fs-400);
  }

  p {
    color: var(--clr-font-text-soft);
  }

  table {
    border-spacing: 1;
    border-collapse: collapse;
    background: var(--clr-accent-soft-t9);
    border-radius: 0.4rem;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;

    tr:first-child {
      background-color: var(--clr-accent-main-t8);
      color: var(--clr-accent-main);
      --font-weight: 500;
    }

    th {
      border: 1px var(--clr-accent-soft-t8) solid;
      padding-inline: 1em;
      padding-block: 0.4em;
      font-size: var(--fs-400);
      text-align: left;
      font-weight: 300;
    }
    .title {
      color: var(--clr-accent-main-t2);
      font-weight: 600;
    }
  }
</style>
