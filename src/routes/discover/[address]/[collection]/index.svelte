<script>
  import { checkRequiredVerifiers, getCollectionInfo } from "$flow/actions";
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
  } from "$atoms";
  import { page } from "$app/stores";
  import { user } from "$stores/FlowStore";
  import { authenticate } from "@onflow/fcl";
  import TransactionModal from "$lib/components/atoms/TransactionModal.svelte";

  async function getStats(metadatas, purchasedIndexes) {
    return new Promise(async (resolve, reject) => {
      let min = Number.POSITIVE_INFINITY;
      let highestBuy = 0.0;
      for (const index in metadatas) {
        if (!purchasedIndexes.includes(index) && metadatas[index].price < min) {
          min = metadatas[index].price;
        }
        if (
          purchasedIndexes.includes(index) &&
          metadatas[index].price > highestBuy
        ) {
          highestBuy = metadatas[index].price;
        }
      }
      resolve({
        floorPrice: Number(min).toFixed(3),
        highestBuy: Number(highestBuy).toFixed(3),
        totalItems: metadatas.length,
        numPurchased: purchasedIndexes.length,
        available: metadatas.length - purchasedIndexes.length,
      });
    });
  }

  let seeMine = false;
</script>

<HtmlHead title="Discover" />
<TransactionModal />

{#await getCollectionInfo($page.params.collection, $page.params.address) then collectionInfo}
  <Section class="padding-top-small padding-bottom-small">
    <Container class="width-x-large">
      <TransparentCard padding="0">
        {#if collectionInfo.bannerImage}
          <div
            class="banner"
            style={`background-image: url("https://nftstorage.link/ipfs/${collectionInfo.bannerImage.cid}/${collectionInfo.bannerImage.path}")`} />
        {/if}
        <Container>
          <div
            class="collection-info-wrapper"
            class:no-banner={!collectionInfo.bannerImage}>
            <Stack direction="row" align="flex-end" justify="space-between">
              <Stack direction="row" align="flex-end">
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
                  <WalletAddress address={$page.params.address}
                    >By</WalletAddress>
                  <Divider space="1px" />
                </Stack>
              </Stack>
              {#if collectionInfo.socials}
                <Stack direction="row" gap="1.5rem">
                  <CollectionSocials
                    collectionSocials={collectionInfo.socials} />
                  <Divider space="1px" />
                </Stack>
              {/if}
            </Stack>
            <Divider space="30px" />
            <Stack direction="column" align="flex-start" gap="1.7em">
              <h1>{collectionInfo.name}</h1>
              <p>{collectionInfo.description}</p>
              {#await getStats(Object.values(collectionInfo.metadatas), Object.keys(collectionInfo.primaryBuyers)) then stats}
                <AdaptableGrid minWidth="5em" gap="1.2em">
                  <div>
                    <strong>
                      {stats.totalItems}
                    </strong>
                    <p>total items</p>
                  </div>
                  <div>
                    <strong>
                      {stats.numPurchased}
                    </strong>
                    <p>purchased</p>
                  </div>
                  <div>
                    <strong>
                      {stats.available}
                    </strong>
                    <p>available</p>
                  </div>

                  {#if !collectionInfo.lotteryBuying}
                    <div>
                      <strong>
                        <img src="/flow-logo.png" alt="flow logo" />
                        {stats.floorPrice}
                      </strong>
                      <p>floor price</p>
                    </div>
                    <div>
                      <strong>
                        <img src="/flow-logo.png" alt="flow logo" />
                        {stats.highestBuy}
                      </strong>
                      <p>highest buy</p>
                    </div>
                  {:else}
                    <div>
                      <strong>
                        <img src="/flow-logo.png" alt="flow logo" />
                        {Number(collectionInfo.price).toFixed(3)}
                      </strong>
                      <p>price</p>
                    </div>
                  {/if}
                </AdaptableGrid>
              {/await}
              <label for="my-purchases" class="checkbox-label">
                <input
                  name="my-purchases"
                  id="my-purchases"
                  type="checkbox"
                  bind:value={seeMine} />
                View Your Purchases
              </label>
              {#await checkRequiredVerifiers($page.params.collection, $page.params.address, $user?.addr) then verifiers}
                <!-- TODO: APPLY VERIFIERS -->
                {#if verifiers.length > 0}
                  <Verifiers {verifiers} />
                {/if}
              {/await}
            </Stack>
            {#if !$user.loggedIn}
              <Button on:click={() => authenticate()}>Connect</Button>
            {/if}
            {#await checkRequiredVerifiers($page.params.collection, $page.params.address, $user?.addr) then verifiers}
              {#if !verifiers.some((verifier) => verifier.passing == false)}
                <div class="nft-list-wrapper">
                  <AdaptableGrid minWidth="12em" gap="1.2em">
                    {#if seeMine}
                      <MyNFTs
                        metadatas={collectionInfo.metadatas}
                        primaryBuyers={collectionInfo.primaryBuyers}
                        addr={$user?.addr} />
                    {:else if !collectionInfo.lotteryBuying}
                      {#each Object.values(collectionInfo.metadatas) as NFT}
                        <NFTCard
                          thumbnailURL={`https://nftstorage.link/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`}
                          name={NFT.name}
                          description={NFT.description}
                          price={Number(NFT.price).toFixed(3)}
                          buy={!Object.keys(
                            collectionInfo.primaryBuyers
                          ).includes(NFT.metadataId)}
                          url={`/discover/${$page.params.address}/${$page.params.collection}/${NFT.metadataId}`}
                          withLink={true} />
                      {/each}
                    {:else}
                      <NFTCarousel
                        metadatas={collectionInfo.metadatas}
                        price={collectionInfo.price}
                        address={$page.params.address}
                        contractName={$page.params.collection}
                        number={Object.keys(collectionInfo.metadatas).length} />
                    {/if}
                  </AdaptableGrid>
                </div>
              {/if}
            {/await}
          </div>
        </Container>
      </TransparentCard>
    </Container>
  </Section>
{/await}

<style type="scss">
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
  }
  .no-banner {
    top: 0px;
    margin-bottom: 40px;
  }

  .image-wrapper {
    height: 200px;
    border-radius: 0.4rem;
    border: 3px var(--clr-accent-soft-t4) solid;
    background-color: var(--clr-background-primary);
  }

  h1 {
    font-size: var(--fs-500);
    text-align: left;
  }
  p {
    font-size: var(--fs-300);
    text-align: left;
  }
  strong {
    display: flex;
    align-items: center;

    img {
      width: 25px;
      margin-right: 5px;
    }
  }

  .nft-list-wrapper {
    margin-top: 2.8rem;
  }
</style>
