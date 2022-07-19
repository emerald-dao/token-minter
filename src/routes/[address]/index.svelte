<script>
  import { getContracts } from "../../flow/actions";
  import { dappTitle } from "$lib/config/config";
  import {
    Section,
    Container,
    Stack,
    CollectionCard,
  } from "$lib/components/atoms/index";
  import { page } from "$app/stores";

  const owner = $page.params.address;
</script>

<Section class="padding-top-small padding-bottom-small">
  <Container>
    <h1>Collections</h1>
    <p>
      Browse collections created with {dappTitle} and mint your favourite NFTs
    </p>
    {#await getContracts(owner) then collections}
      <Stack direction="column">
        {#each collections as collection}
          <CollectionCard
            name={collection.name}
            url={`/${owner}/${collection.name.replace(/\s+/g, "")}`}
            thumbnailURL={`https://nftstorage.link/ipfs/${collection.image.cid}/${collection.image.path}`}
            description={collection.description}
            {owner} />
        {/each}
      </Stack>
    {/await}
  </Container>
</Section>

<style type="scss">
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
