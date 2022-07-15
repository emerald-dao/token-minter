<script>
  import { getCollectionInfo, purchaseNFT } from "../../flow/actions";

  import {
    Section,
    Container,
    Stack,
    AdaptableGrid,
    NFTCard,
  } from "$lib/components/atoms/index";
  import { page } from "$app/stores";

  const purchaseFunction = (serial, price) => {
    purchaseNFT(serial, price, $page.params.collection, $page.params.address);
  };
</script>

<Section class="padding-top-small padding-bottom-small">
  {#await getCollectionInfo($page.params.collection, $page.params.address) then collectionInfo}
    <Container class="width-small">
      <Stack>
        <img src="/images/guide/ballerz.png" alt="Collection main" />
        <h1>{collectionInfo.name}</h1>
        <p>{collectionInfo.description}</p>
      </Stack>
    </Container>
    <Container>
      <AdaptableGrid minWidth="12em" gap="1.2em">
        {#each collectionInfo.metadatas as NFT}
          <NFTCard
            thumbnailURL={`https://nftstorage.link/ipfs/${collectionInfo.ipfsCID}/${NFT.thumbnailPath}`}
            name={NFT.name}
            description={NFT.description}
            price={parseFloat(collectionInfo.price).toFixed(2)}
            buy={!collectionInfo.purchasedNFTs.includes(NFT.metadataId)}
            serial={NFT.metadataId}
            {purchaseFunction} />
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
