<script>
  import { Section, Container, CollectionCard, Stack } from "$atoms";

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
      name: "Maneki Planets",
      thumbnailURL: "/geniace-planets.png",
      description:
        "Our iconic MANEKI planets, with just 224 lucky cats in this collection. With an inviting raised paw and pointy ears, these iconic lucky charms have been bringing good fortune for centuries. The MANEKI is the adopted icon of the GENIACE community and brings good fortune & benefits to those who hold a special MANEKI NFT",
      owner: "Geniace",
      url: "/discover/0xcf3c77ef638573e8/TouchstoneManekiPlanets",
    },
    {
      name: "Halloween by AI",
      thumbnailURL: "/halloween-by-ai.png",
      description:
        "This collection was all made by MidJorney's artificial intelligence, no person has ever touched it",
      owner: "SuuriKat",
      url: "/discover/0x1c09c3b8d6bf323b/TouchstoneHalloweencreatedbyAi",
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
