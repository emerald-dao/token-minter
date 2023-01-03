<script>
  import { dappTitle } from "$lib/config/config";
  import {
    Section,
    Container,
    Stack,
    CollectionCard,
    Button,
    HtmlHead,
  } from "$atoms";
  import { goto } from "$app/navigation";

  let collections = [
    {
      name: "Emeralds",
      thumbnailURL: "/emerald_2_thmb.png",
      description:
        "This is the first official Emerald City NFT collection, and the first ever collection on Touchstone. Featured in this collection are different types of Emeralds, all with different origins, planets, energetic properties, and elements. Purchasing these Emeralds will help pay developers inside of Emerald City to build more free tools like Touchstone, educate more users inside of Emerald Academy, and will grant you free months of Emerald Pass subscription.",
      owner: "Emerald City",
      url: "/Emeralds",
    },
    {
      name: "Best Teas",
      thumbnailURL: "/best-teas.png",
      description:
        "A collection of bubble teas designed by a 14 year old builder on Flow. The artist has already begun learning about smart contracts on Flow, and is looking to continue on her journey of learning Cadence.",
      owner: "0x213c401adf5c8854",
      url: "/discover/0x213c401adf5c8854/TouchstoneBestTeas",
    },
  ];

  let address;
</script>

<HtmlHead title="Discover" />

<Section class="padding-top-small padding-bottom-small">
  <Container>
    <Stack direction="column" align="center" gap="0">
      <h1>Discover Collections</h1>
      <p>
        Browse collections created with {dappTitle} and mint your favourite NFTs
      </p>
      <form on:submit|preventDefault={() => goto(`discover/${address}`)}>
        <input
          type="text"
          bind:value={address}
          placeholder="0x5643fd47a29770e7" />
        <Button>Search</Button>
      </form>

      <Stack direction="column">
        {#each collections as collection}
          <CollectionCard
            name={collection.name}
            url={collection.url}
            thumbnailURL={collection.thumbnailURL}
            description={collection.description}
            owner={collection.owner} />
        {/each}
      </Stack>
    </Stack>
  </Container>
</Section>

<style type="scss">
  @use "../../lib/styles/abstracts" as *;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    gap: 0.6rem;

    @include mq(small) {
      flex-direction: row;
    }

    input {
      margin-top: 0px;
      width: 100%;
      height: 100%;

      @include mq(small) {
        max-width: 25rem;
      }
    }
  }
  h1 {
    font-size: var(--fs-700);
    text-align: center;
    margin-bottom: 0.2em;
  }
  p {
    font-size: var(--fs-400);
    text-align: center;
    margin-bottom: 1.8em;
  }
</style>
