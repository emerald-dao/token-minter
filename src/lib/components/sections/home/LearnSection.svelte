<script>
	import {
		Section,
		Container,
		Button,
		AdaptableGrid,
		Stack,
		Ball,
		Feature,
	} from "$atoms";
	import { GradientWrapper, Gradient } from "$components/gradients";

	let tools = [
		{
			title: "User Guide",
			icon: "ion:document-text",
			description: `Explore the <a href="/guide/en/welcome" target="_blank">User Guide</a>, an educational experience around NFTs to teach you everything there is to know about metadata, smart contracts, decentralized storage, and more.`,
		},
		{
			title: "Ask in Emerald City",
			icon: "ion:chatbubbles",
			description: `Want to join a community filled with developers who are also interested in developing NFT smart contracts on the Flow Blockchain? Join the <a href="https://discord.com/invite/emerald-city-906264258189332541" target="_blank">Emerald City Discord</a>!`,
		},
		{
			title: "Emerald Academy",
			icon: "ion:school",
			description: `Check out <a href="https://academy.ecdao.org/" target="_blank">Emerald Academy</a>, the most popular educational platform on the Flow Blockchain.`,
		},
	];
</script>

<div class="background">
	<Section>
		<Container width="large">
			<Stack>
				<h2>Supporting Resources</h2>
				<AdaptableGrid minWidth="18rem">
					{#each tools as tool}
						<Feature
							title={tool.title}
							description={tool.description}
							background={true}
							center={true}
						>
							<Ball accent={true} icon={tool.icon} size="3rem" />
						</Feature>
					{/each}
				</AdaptableGrid>
			</Stack>
		</Container>
		<GradientWrapper>
			<Gradient
				left="25%"
				top="10%"
				blur="60px"
				width="390px"
				height="430px"
				color="var(--clr-background-gradient-secondary)"
			/>
			<Gradient
				left="48%"
				top="40%"
				blur="60px"
				width="430px"
				height="410px"
			/>
		</GradientWrapper>
	</Section>
</div>

<style type="scss">
	h2 {
		padding-bottom: 2rem;
	}
	.background {
		border-block: 1px var(--clr-accent-main-t6) solid;
		position: relative;
	}
</style>
