<script>
  import flowPriceStore from "$stores/FlowPriceStore";
  import { checkRequiredVerifiers, getClaimableNFTs } from "$flow/actions";
  import {
    Section,
    Container,
    Stack,
    AdaptableGrid,
    MadeWithTouchstone,
    TransparentCard,
    WalletAddress,
    Divider,
    NftImage,
    CollectionSocials,
    Verifiers,
    MyNFTs,
    CollectionFilters,
  } from "$atoms";
  import { page } from "$app/stores";
  import { user } from "$stores/FlowStore";
  import IntersectionObserver from "svelte-intersection-observer";
  import CollectionStats from "../sections/sale/CollectionStats.svelte";
  import Select from "../atoms/Select.svelte";
  import DisplayItems from "../sections/sale/DisplayItems.svelte";

  export let contractAddress = $page.params.address;

  let itemsToDisplay = 50;
  let element;
  let intersecting;

  let seeMine = false;
  let available = false;
  let nameFilter;
  let maxPrice;
  let minPrice;
  let showNFT = true;
  export let collectionInfo;
  console.log(collectionInfo);
</script>

<Section class="padding-top-none padding-bottom-small">
  <Container class="width-full">
    <TransparentCard padding="0">
      {#if collectionInfo?.bannerImage}
        <div
          class="banner"
          style={`background-image: url("https://nftstorage.link/ipfs/${collectionInfo.bannerImage.cid}/${collectionInfo.bannerImage.path}")`} />
      {/if}
      <Container class="width-full">
        <div
          class="collection-info-wrapper"
          class:no-banner={!collectionInfo.bannerImage}>
          <div class="collection-info">
            <div class="presentation-wrapper">
              <div class="image-wrapper">
                <NftImage
                  thumbnailURL={`https://nftstorage.link/ipfs/${collectionInfo.image.cid}/${collectionInfo.image.path}`}
                  name={`${collectionInfo.name} main image`} />
              </div>
              <Stack
                direction="column"
                gap="0.8em"
                align="center"
                justify="flex-start">
                <MadeWithTouchstone />
                <WalletAddress address={contractAddress}>By</WalletAddress>
                <Divider space="1px" />
              </Stack>
            </div>
            {#if collectionInfo.socials}
              <Stack direction="row" gap="1.5rem">
                <CollectionSocials collectionSocials={collectionInfo.socials} />
                <Divider space="1px" />
              </Stack>
            {/if}
          </div>
          <Divider space="30px" />
          <Stack direction="column" align="flex-start" gap="1.7em">
            <h1>{collectionInfo.name}</h1>
            <p class="collection-description">
              {collectionInfo.description}
            </p>
            <CollectionStats
              {collectionInfo}
              version={collectionInfo.version} />
            {#await checkRequiredVerifiers($page.params.collection, contractAddress, $user?.addr) then verifiers}
              {#if verifiers.length > 0}
                <Verifiers {verifiers} />
              {/if}
            {/await}
          </Stack>
          <div class="nft-list-wrapper">
            <CollectionFilters
              bind:seeMine
              bind:available
              bind:nameFilter
              bind:maxPrice
              bind:minPrice />
            <div class="main-area">
              <Select bind:value={showNFT}>
                <option value={true}>NFTs</option>
                <option value={false}>Packs</option>
              </Select>
              <AdaptableGrid minWidth="12em" gap="1.2em">
                {#if seeMine}
                  <MyNFTs
                    version={collectionInfo.version}
                    metadatas={collectionInfo.nftMetadatas}
                    primaryBuyers={collectionInfo.primaryBuyers}
                    addr={$user?.addr}
                    collectionPrice={collectionInfo.price} />
                {:else}
                  <DisplayItems
                    {collectionInfo}
                    metadatas={showNFT
                      ? collectionInfo.nftMetadatas
                      : collectionInfo.packMetadatas}
                    bind:maxPrice
                    bind:minPrice
                    bind:itemsToDisplay
                    bind:available
                    bind:nameFilter />
                  <IntersectionObserver
                    {element}
                    bind:intersecting
                    on:observe={() => {
                      itemsToDisplay = itemsToDisplay + 20;
                    }}>
                    <div bind:this={element} />
                  </IntersectionObserver>
                {/if}
              </AdaptableGrid>
            </div>
          </div>
        </div>
      </Container>
    </TransparentCard>
  </Container>
</Section>

<style type="scss">
  @use "../../../lib/styles/abstracts" as *;

  .banner {
    height: 220px;
    background-size: cover;
    background-position: center center;
    background-color: var(--clr-background-primary);
    border-radius: 1rem 1rem 0 0;
  }

  .collection-info-wrapper {
    margin-bottom: -80px;
    position: relative;
    top: -120px;

    .collection-info {
      @include mq(medium) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }

      .presentation-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        align-items: flex-start;

        @include mq(medium) {
          flex-direction: row;
          align-items: flex-end;
        }
      }
    }
  }
  .no-banner {
    top: 0px;
    margin-bottom: 40px;
  }

  .image-wrapper {
    height: 200px;
    min-width: 200px;
    width: auto;
    border-radius: 0.8rem;
    border: 3px var(--clr-accent-soft-t4) solid;
    background-color: var(--clr-background-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  h1 {
    font-size: var(--fs-500);
    text-align: left;
  }

  .collection-description {
    font-size: var(--fs-300);
    max-width: 80ch;
    color: var(--clr-font-text-t2);
  }

  .nft-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;

    @include mq(small) {
      display: grid;
      grid-template-columns: 240px auto;
      margin-top: 2.8rem;
      gap: 2rem;
    }
  }

  .main-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
