<script>
  import {
    Section,
    Container,
    Stack,
    AdaptableGrid,
    WalletAddress,
    NFTPrice,
    Button,
    MadeWithTouchstone,
  } from "$lib/components/atoms/index";
  import {
    getCollectionInfo,
    getNFTInfo,
    purchaseNFT,
  } from "../../../../../flow/actions.js";
  import { page } from "$app/stores";

  async function getInfo() {
    const nftInfo = await getNFTInfo(
      $page.params.collection,
      $page.params.address,
      $page.params.nft
    );
    const collectionInfo = await getCollectionInfo(
      $page.params.collection,
      $page.params.address
    );
    console.log({ collectionInfo, nftInfo });
    return { collectionInfo, nftInfo };
  }
</script>

<Section class="padding-top-small">
  <Container>
    <AdaptableGrid>
      {#await getInfo() then info}
        <Stack direction="column" align="flex-start">
          <img src={`https://nftstorage.link/ipfs/${info.nftInfo.thumbnail.cid}/${info.nftInfo.thumbnail.path}`} alt="Ballerz NFT" />
          <Stack direction="column" align="flex-start" gap="0.4em">
            <h4>Description</h4>
            <p>{info.nftInfo.description}</p>
          </Stack>
          <Stack direction="column" align="flex-start" gap="0.4em">
            <h4>Metadata</h4>
            <table>
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
        </Stack>
        <div class="sticky">
          <Stack direction="column" align="flex-start">
            <Stack direction="column" gap="0.6em" align="flex-start">
              <MadeWithTouchstone />
              <WalletAddress address={$page.params.address}>By</WalletAddress>
            </Stack>
            <h1>{info.nftInfo.name}</h1>

            <NFTPrice
              price={info.nftInfo.price
                ? info.nftInfo.price
                : info.collectionInfo.price}
              width="34px"
              fontSize="var(--fs-500)"
              currentPrice={true} />
            <Button
              on:click={() =>
                purchaseNFT(
                  $page.params.nft,
                  info.nftInfo.price
                    ? info.nftInfo.price
                    : info.collectionInfo.price,
                  $page.params.collection,
                  $page.params.address
                )}>Buy NFT</Button>
          </Stack>
        </div>
      {/await}
    </AdaptableGrid>
  </Container>
</Section>

<style type="scss">
  @use "../../../../../lib/styles/abstracts" as *;

  img {
    width: 100%;
    border-radius: 0.4rem;
    border: 1px var(--clr-accent-soft-t5) solid;
  }
  .sticky {
    @include mq(medium) {
      position: sticky;
      top: 5rem;
      height: fit-content;
    }
  }

  h1 {
    font-size: var(--fs-700)
  }

  h4 {
    padding-bottom: 0.2em;
    font-size: var(--fs-400)
  }

  p {
    color: var(--clr-font-text-soft)
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
