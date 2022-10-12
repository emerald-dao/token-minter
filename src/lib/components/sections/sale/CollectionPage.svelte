<script>
  import flowPriceStore from "$stores/FlowPriceStore";
  import { browser } from "$app/env";
  import {
    checkRequiredVerifiers,
    getClaimableNFTs,
    getCollectionInfo,
  } from "$flow/actions";
  import {
    Section,
    Container,
    Stack,
    AdaptableGrid,
    NFTCard,
    MadeWithTouchstone,
    TransparentCard,
    WalletAddress,
    Divider,
    NftImage,
    CollectionSocials,
    HtmlHead,
    Button,
    NFTCarousel,
    Verifiers,
    MyNFTs,
    CollectionStat,
    CollectionFilters,
    TransactionModal,
    WalletConnectModal,
  } from "$atoms";
  import { page } from "$app/stores";
  import { user } from "$stores/FlowStore";
  import IntersectionObserver from "svelte-intersection-observer";

  export let contractAddress = $page.params.address;

  async function getStats(metadatas, purchasedIndexes, collectionPrice) {
    return new Promise(async (resolve, reject) => {
      let min = Number.POSITIVE_INFINITY;
      let highestBuy = 0.0;
      for (const index in metadatas) {
        const nftPrice = Number(metadatas[index].price ?? collectionPrice);
        if (!purchasedIndexes.includes(index) && nftPrice < min) {
          min = nftPrice;
        }
        if (purchasedIndexes.includes(index) && nftPrice > highestBuy) {
          highestBuy = nftPrice;
        }
      }
      resolve({
        floorPrice: min == Number.POSITIVE_INFINITY ? "N/A" : Number(min),
        highestBuy: Number(highestBuy),
        totalItems: metadatas.length,
        numPurchased: purchasedIndexes.length,
        available: metadatas.length - purchasedIndexes.length,
      });
    });
  }

  const [flowPrice, loading, error] = flowPriceStore();

  let nftsToDisplay = 50;
  let element;
  let intersecting;

  let seeMine = false;
  let available = false;
  let nameFilter;
  let maxPrice;
  let minPrice;
</script>

<HtmlHead title="Discover" />
<TransactionModal />


{#await getCollectionInfo($page.params.collection, contractAddress) then collectionInfo}
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
                  <CollectionSocials
                    collectionSocials={collectionInfo.socials} />
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
              {#await getStats(Object.values(collectionInfo.metadatas), Object.keys(collectionInfo.primaryBuyers), collectionInfo.price) then stats}
                <AdaptableGrid minWidth="5em" gap="1.2em">
                  <CollectionStat
                    title="total items"
                    stat={stats.totalItems} />
                  <CollectionStat
                    title="purchased"
                    stat={stats.numPurchased} />
                  <CollectionStat title="available" stat={stats.available} />
                  {#if !collectionInfo.lotteryBuying}
                    <CollectionStat
                      title="floor price"
                      flowLogo={collectionInfo.paymentType === "$FLOW"}
                      fusdLogo={collectionInfo.paymentType === "$FUSD"}
                      stat={stats.floorPrice} />
                    <CollectionStat
                      title="highest buy"
                      flowLogo={collectionInfo.paymentType === "$FLOW"}
                      fusdLogo={collectionInfo.paymentType === "$FUSD"}
                      stat={stats.highestBuy} />
                  {:else}
                    <CollectionStat
                      title="price"
                      flowLogo={collectionInfo.paymentType === "$FLOW"}
                      fusdLogo={collectionInfo.paymentType === "$FUSD"}
                      stat={Number(collectionInfo.price)} />
                  {/if}
                </AdaptableGrid>
              {/await}
              {#await checkRequiredVerifiers($page.params.collection, contractAddress, $user?.addr) then verifiers}
                {#if verifiers.length > 0}
                  <Verifiers {verifiers} />
                {/if}
              {/await}
            </Stack>
            <div class="nft-list-wrapper">
              {#if !collectionInfo.lotteryBuying}
                {#await getClaimableNFTs($page.params.collection, contractAddress, $user?.addr) then claimableNFTs}
                  <CollectionFilters
                    bind:seeMine
                    bind:available
                    bind:nameFilter
                    bind:maxPrice
                    bind:minPrice
                    {contractAddress}
                    contractName={$page.params.collection}
                    {claimableNFTs} />
                {/await}
              {/if}
              <AdaptableGrid minWidth="12em" gap="1.2em">
                {#if seeMine}
                  <MyNFTs
                    metadatas={collectionInfo.metadatas}
                    primaryBuyers={collectionInfo.primaryBuyers}
                    addr={$user?.addr}
                    collectionPrice={collectionInfo.price} />
                {:else if !collectionInfo.lotteryBuying}
                  {#each Object.values(collectionInfo.metadatas) as NFT, i}
                    <!-- Apply filters -->
                    {#if (maxPrice === undefined || maxPrice >= Number(NFT.price ?? collectionInfo.price)) && (minPrice === undefined || minPrice <= Number(NFT.price ?? collectionInfo.price)) && i < nftsToDisplay}
                      {#if $loading}
                        Loading: {$loading}
                      {:else if $error}
                        Error: {$error}
                      {:else if browser && (!available || !collectionInfo.primaryBuyers[NFT.metadataId]) && (!nameFilter || NFT.name
                            .toUpperCase()
                            .includes(nameFilter.toUpperCase()))}
                        <NFTCard
                          thumbnailURL={NFT.thumbnail
                            ? `https://nftstorage.link/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`
                            : `https://nftstorage.link/ipfs/${NFT.image.cid}/${NFT.image.path}`}
                          name={NFT.name}
                          description={NFT.description}
                          price={Number(
                            NFT.price ?? collectionInfo.price
                          )}
                          buy={!Object.keys(
                            collectionInfo.primaryBuyers
                          ).includes(NFT.metadataId)}
                          url={`/discover/${contractAddress}/${$page.params.collection}/${NFT.metadataId}`}
                          withLink={true}
                          flowPrice={$flowPrice.price}
                          paymentType={collectionInfo.paymentType} />
                      {/if}
                    {/if}
                  {/each}
                  <IntersectionObserver {element} bind:intersecting on:observe={() => {
                    nftsToDisplay = nftsToDisplay + 20;
                  }}>
                    <div bind:this={element}/>
                  </IntersectionObserver>
                {:else}
                  <NFTCarousel
                    metadatas={collectionInfo.metadatas}
                    price={collectionInfo.price}
                    paymentType={collectionInfo.paymentType}
                    address={contractAddress}
                    contractName={$page.params.collection}
                    number={Object.keys(collectionInfo.metadatas)
                      .length} />
                {/if}
              </AdaptableGrid>
            </div>
          </div>
        </Container>
      </TransparentCard>
    </Container>
  </Section>
{/await}


<style type="scss">
  @use "../../../../lib/styles/abstracts" as *;

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
</style>
