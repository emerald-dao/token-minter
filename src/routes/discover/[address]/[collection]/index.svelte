<script>
  import {
    checkRequiredVerifiers,
    getCollectionInfo,
    purchaseNFT,
  } from "../../../../flow/actions";

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
    CollectionSocials
  } from "$lib/components/atoms/index";
  import { page } from "$app/stores";
  import { user } from "../../../../flow/stores.js";
  import Verifiers from "$lib/components/atoms/Verifiers.svelte";
  import { params } from "@onflow/fcl";

  const purchaseFunction = (serial, price) => {
    purchaseNFT(serial, price, $page.params.collection, $page.params.address);
  };
</script>

{#await getCollectionInfo($page.params.collection, $page.params.address) then collectionInfo}
  <Section class="padding-top-small padding-bottom-small">
    <Container class="width-x-large">
      <TransparentCard padding="0">
        {#if collectionInfo.bannerImage}
          <div class="banner" style={`background-image: url("https://nftstorage.link/ipfs/${collectionInfo.bannerImage.cid}/${collectionInfo.bannerImage.path}")`} />
        {/if}
        <Container>
          <div class="collection-info-wrapper" class:no-banner={!collectionInfo.bannerImage}>
            <Stack direction="row" align="flex-end" justify="space-between">
              <Stack direction="row" align="flex-end">
                <div class="image-wrapper">
                  <NftImage thumbnailURL={`https://nftstorage.link/ipfs/${collectionInfo.image.cid}/${collectionInfo.image.path}`} name={`${collectionInfo.name} main image`} />
                </div>
                <Stack direction="column" gap="0.8em" align="center" justify="flex-start">
                  <MadeWithTouchstone />
                  <WalletAddress address={$page.params.address}>By</WalletAddress>
                  <Divider space="1px"/>
                </Stack>
              </Stack>
                {#if collectionInfo.socials}
                  <Stack direction="row" gap="1.5rem">
                    <CollectionSocials collectionSocials={collectionInfo.socials} />
                    <Divider space="1px"/>
                  </Stack>
                {/if}
            </Stack>
            <Divider space="30px"/>
            <Stack direction="column" align="flex-start" gap="1.2em">
              <h1>{collectionInfo.name}</h1>
              <p>{collectionInfo.description}</p>
              {#await checkRequiredVerifiers($page.params.collection, $page.params.address, $user.addr) then verifiers}
                {#if verifiers.length > 0}
                  <Verifiers {verifiers} />
                {/if}
              {/await}
            </Stack>
            <div class="nft-list-wrapper">
              <AdaptableGrid minWidth="12em" gap="1.2em">
                {#each Object.values(collectionInfo.metadatas) as NFT}
                  <NFTCard
                    thumbnailURL={`https://nftstorage.link/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`}
                    name={NFT.name}
                    description={NFT.description}
                    price={NFT.price
                      ? parseFloat(NFT.price).toFixed(2)
                      : parseFloat(collectionInfo.price).toFixed(2)}
                    buy={!Object.keys(collectionInfo.primaryBuyers).includes(
                      NFT.metadataId
                    )}
                    extra={NFT.extra}
                    serial={NFT.metadataId}
                    {purchaseFunction}
                    url={`/discover/${$page.params.address}/${$page.params.collection}/${NFT.metadataId}`}
                    withLink={true} />
                {/each}
              </AdaptableGrid>
            </div>
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
    font-size: var(--fs-700);
    text-align: left;
  }
  p {
    font-size: var(--fs-300);
    text-align: left;
  }

  .nft-list-wrapper {
    margin-top: 2.8rem
  }
</style>
