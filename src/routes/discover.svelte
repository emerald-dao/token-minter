<script>
  import { user } from "../flow/stores";
  import { getContracts } from "../flow/actions";
  import { dappTitle } from "$lib/config/config";
  import {
    Section,
    Container,
    Stack,
    CollectionCard,
  } from "$lib/components/atoms/index";
  import Button from "$lib/components/atoms/Button.svelte";

  let collections = [
    {
      name: "Hats NFT 6",
      slug: "HatsNFT6",
      thumbnailURL: "/images/guide/ballerz.png",
      description:
        "Hats NFT 6 created their collection on Touchstone. Founded in 2016, they have been OGs in the crypto space...!",
      owner: "0x6c0d53c676256e8c",
    },
    {
      name: "Ballerz",
      slug: "ballerz",
      thumbnailURL: "/images/guide/ballerz.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      owner: "0x0da118e8ae345d95",
    },
    {
      name: "Ballerz",
      slug: "ballerz",
      thumbnailURL: "/images/guide/ballerz.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      owner: "0x0da118e8ae345d95",
    },
  ];

  getContracts($user?.addr);

  let address;
</script>

<Section class="padding-top-small padding-bottom-small">
  <Container>
    <h1>Discover Collections</h1>
    <p>
      Browse collections created with {dappTitle} and mint your favourite NFTs
    </p>
    <div class="flex">
      <input
        type="text"
        bind:value={address}
        placeholder="0x5643fd47a29770e7" />
      <Button href={`${address}`}>Search</Button>
    </div>

    <Stack direction="column">
      {#each collections as collection}
        <CollectionCard
          name={collection.name}
          url={`/${collection.owner}/${collection.slug}`}
          thumbnailURL={collection.thumbnailURL}
          description={collection.description}
          owner={collection.owner} />
      {/each}
    </Stack>
  </Container>
</Section>

<style type="scss">
  .flex {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    display: flex;
    margin-bottom: 100px;

    input {
      margin-right: 5px;
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
