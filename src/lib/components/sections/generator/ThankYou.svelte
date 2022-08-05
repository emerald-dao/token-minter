<script>
  import { dappTitle } from "$lib/config/config";
  import { Button, CollectionCard, Stack } from "$lib/components/atoms/index";
  import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
  import { newCollection } from "$lib/stores/generator/GeneratorGeneralStore"

  let collection = {
      name: "Hats NFT 6",
      slug: "HatsNFT6",
      thumbnailURL: "/images/guide/ballerz.png",
      description:
        "Hats NFT 6 created their collection on Touchstone. Founded in 2016, they have been OGs in the crypto space...!",
      owner: "0x6c0d53c676256e8c",
    }
</script>

<GeneratorStepLayout>
  <Stack slot="main-content" direction="column" align="start">
    <div>
      <h3>Thank You!</h3>
      <p>{`Thanks for uploading your collection with ${dappTitle}.`}</p>
    </div>
    <CollectionCard
      name={collection.name}
      url={`/${collection.owner}/${collection.slug}`}
      thumbnailURL={collection.thumbnailURL}
      description={collection.description}
      owner={collection.owner} />
  </Stack>
  <Button slot="buttons" on:click={newCollection} leftIcon="add-circle">
    Create new collection
  </Button>
</GeneratorStepLayout>

<style type="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    height: 100%;
  }
</style>