<script>
	import {
		Section,
		Container,
		CollectionCard,
		Stack,
	} from "$atoms";

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
    }
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
              owner={collection.owner} 
            />
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
    background: 
      radial-gradient(ellipse at right, var(--clr-primary-main-t9), transparent),
      radial-gradient(ellipse at left, var(--clr-primary-main-t9), transparent),
      radial-gradient(ellipse at bottom, var(--clr-primary-soft-t4), transparent),
      radial-gradient(ellipse at top, var(--clr-accent-soft-t4), transparent);
		backdrop-filter: blur(50px);
	}
</style>
