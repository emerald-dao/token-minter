<script>
  import { getContractDisplays } from "../../../flow/actions";
  import { dappTitle } from "$lib/config/config";
  import {
    Section,
    Container,
    Stack,
    CollectionCard,
    HtmlHead
  } from "$atoms";
  import { page } from "$app/stores";

  const owner = $page.params.address;
</script>

<HtmlHead title="Discover"/>

<Section class="padding-top-small padding-bottom-small">
  <Container>
    <h1>Browse Collections</h1>
    <p>
      Check out {owner}'s collections created with {dappTitle}!
    </p>
    {#await getContractDisplays(owner) then collections}
      <Stack direction="column">
        {#each collections as collection}
          <CollectionCard
            name={collection.name}
            url={`/discover/${owner}/${collection.contractName}`}
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
