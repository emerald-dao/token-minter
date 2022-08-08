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
    <Container class="width-small">
      <Stack>
        <img
          src={`https://nftstorage.link/ipfs/${collectionInfo.image.cid}/${collectionInfo.image.path}`}
          alt="Collection main" />
        <h1>{collectionInfo.name}</h1>
        <p>{collectionInfo.description}</p>
      </Stack>
    </Container>
    {#await checkRequiredVerifiers($page.params.collection, $page.params.address, $user.addr) then verifiers}
      <Container>
        <Verifiers {verifiers} />
      </Container>
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
  img {
    width: 200px;
    aspect-ratio: 1/1;
    border-radius: 1.5em;
    border: 2px var(--clr-accent-soft) solid;
  }
  h1 {
    font-size: var(--fs-600);
    text-align: center;
  }
  p {
    font-size: var(--fs-300);
    text-align: center;
  }
</style>
