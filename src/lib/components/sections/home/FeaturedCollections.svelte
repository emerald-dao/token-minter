<script>
  import { Section, Container, CollectionCard, Stack } from "$atoms";

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
</script>

<div class="background">
  <Section>
    <Container width="large">
      <Stack>
        <h2>Trending Collections</h2>
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
</div>

<style type="scss">
  h2 {
    padding-bottom: 2rem;
  }
  .background {
    border-top: 4px var(--clr-accent-main-t8) solid;
    background: radial-gradient(
        ellipse at right,
        var(--clr-primary-main-t9),
        transparent
      ),
      radial-gradient(ellipse at left, var(--clr-primary-main-t9), transparent),
      radial-gradient(
        ellipse at bottom,
        var(--clr-primary-soft-t4),
        transparent
      ),
      radial-gradient(ellipse at top, var(--clr-accent-soft-t4), transparent);
    backdrop-filter: blur(50px);
  }
</style>
