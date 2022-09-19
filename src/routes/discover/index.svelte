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
      name: "Official Testnet Test",
      slug: "OfficialTestnetTest",
      thumbnailURL: "/nft_cap1.png",
      description:
        "This is our first official test of Touchstone on Testnet. NOTE: Because this is on testnet, this is not a real collection.",
      owner: "0xfe10201e647ca718",
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
            url={`/discover/${collection.owner}/${collection.slug}`}
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
