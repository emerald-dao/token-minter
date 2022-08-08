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
  } from "$lib/components/atoms/index";
  import { page } from "$app/stores";
  import { user } from "../../../../flow/stores.js";
  import Verifiers from "$lib/components/atoms/Verifiers.svelte";

  const purchaseFunction = (serial, price) => {
    purchaseNFT(serial, price, $page.params.collection, $page.params.address);
  };
</script>

<Section class="padding-top-small padding-bottom-small">
  {#await getCollectionInfo($page.params.collection, $page.params.address) then collectionInfo}
    <Container class="x-large">
      <AdaptableGrid>
        <TransparentCard accent={true}>
          <div class="image-wrapper">
            <img
            src={`https://nftstorage.link/ipfs/${collectionInfo.image.cid}/${collectionInfo.image.path}`}
            alt="Collection main" />
          </div>
        </TransparentCard>
        <Stack direction="column" align="flex-start" gap="0.8em">
          <h1>{collectionInfo.name}</h1>
          <Stack direction="column" gap="0.6em" align="flex-start">
            <MadeWithTouchstone/>
            <WalletAddress address={$page.params.address}>
              By
            </WalletAddress>
          </Stack>
          <p>{collectionInfo.description}</p>
        </Stack>
      </AdaptableGrid>
    </Container>
    {#await checkRequiredVerifiers($page.params.collection, $page.params.address, $user.addr) then verifiers}
      {#if verifiers.length > 0}
        <Container>
          <Verifiers {verifiers} />
        </Container>
      {/if}
    {/await}
    <Container>
      <AdaptableGrid minWidth="12em" gap="1.2em">
        {#each Object.values(collectionInfo.metadatas) as NFT}
          <NFTCard
            thumbnailURL={`https://nftstorage.link/ipfs/${NFT.thumbnail.cid}/${NFT.thumbnail.path}`}
            name={NFT.name}
            description={NFT.description}
            price={NFT.extra["price"]
              ? parseFloat(NFT.extra["price"]).toFixed(2)
              : parseFloat(collectionInfo.price).toFixed(2)}
            buy={!Object.keys(collectionInfo.primaryBuyers).includes(
              NFT.metadataId
            )}
            extra={NFT.extra}
            serial={NFT.metadataId}
            {purchaseFunction}
            withLink={true} />
        {/each}
      </AdaptableGrid>
    </Container>
  {/await}
</Section>

<style type="scss"> 
  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    
    img {
      padding: auto;
      width: 200px;
  }
  }

  h1 {
    font-size: var(--fs-600);
    text-align: left;
  }
  p {
    font-size: var(--fs-300);
    text-align: left;
  }
</style>
