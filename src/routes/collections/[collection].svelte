<script>
  import {
    Section,
    Container,
    Stack,
    AdaptableGrid,
    NFTCard,
  } from "$lib/components/atoms/index";

  let NFTs = [
    {
      thumbnailURL: "/images/guide/ballerz.png",
      name: "Ballerz",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: "40 FLOW"
    },
    {
      thumbnailURL: "/images/guide/ballerz.png",
      name: "Ballerz",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: "40 FLOW"
    },
    {
      thumbnailURL: "/images/guide/ballerz.png",
      name: "Ballerz",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: "40 FLOW"
    },
    {
      thumbnailURL: "/images/guide/ballerz.png",
      name: "Ballerz",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: "40 FLOW"
    },
    {
      thumbnailURL: "/images/guide/ballerz.png",
      name: "Ballerz",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: "40 FLOW"
    },
    {
      thumbnailURL: "/images/guide/ballerz.png",
      name: "Ballerz",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: "40 FLOW"
    },
  ];
</script>

<Section class="padding-top-small padding-bottom-small">
  <Container class="width-small">
    <Stack>
      <img src="/images/guide/ballerz.png" alt="Collection main">
      <h1>Ballerz Collection</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
    </Stack>
  </Container>
  <Container>
    <AdaptableGrid minWidth="12em" gap="1.2em">
      {#each NFTs as NFT}
        <NFTCard
          thumbnailURL={NFT.thumbnailURL}
          name={NFT.name}
          backgroundColor={NFT.backgroundColor}
          description={NFT.description}
          price={NFT.price}
          buy="true"
        />
      {/each}
    </AdaptableGrid>
  </Container>
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