<script>
  import { Section, Container, CollectionCard, Stack } from "$atoms";

  let collections = [
    {
      name: "Best Teas",
      thumbnailURL: "/best-teas.png",
      description:
        "A collection of bubble teas designed by a 14 year old builder on Flow. The artist has already begun learning about smart contracts on Flow, and is looking to continue on her journey of learning Cadence.",
      owner: "Izzy",
      url: "/discover/0x213c401adf5c8854/TouchstoneBestTeas",
    },
    {
      name: "FLOW FREAKS",
      thumbnailURL: "/flow-freaks-logo.png",
      description: "A Customized Pixelated NFT PFP on Flow.",
      owner: "Cutter",
      url: "/discover/0xcf0c62932f6ff1eb/TouchstoneFLOWFREAKS",
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
              url={collection.url}
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
    position: relative;
    // background: radial-gradient(
    //     ellipse at right,
    //     var(--clr-primary-main),
    //     transparent
    //   ),
    //   radial-gradient(ellipse at left, var(--clr-primary-main), transparent),
    //   radial-gradient(
    //     ellipse at bottom,
    //     var(--clr-primary-soft),
    //     transparent
    //   ),
    //   radial-gradient(ellipse at top, var(--clr-accent-soft), transparent);
    // backdrop-filter: blur(50px);
  }
</style>
