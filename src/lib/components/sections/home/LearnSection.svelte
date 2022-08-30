<script>
	import {
		Section,
		Container,
		Button,
		AdaptableGrid,
		Stack,
		Ball,
		Feature
	} from "$atoms";

	let tools = [
		{
			title: "Emerald Academy",
			icon: "ion:school",
			description: `Check out <a href="https://academy.ecdao.org/" target="_blank">Emerald Academy</a>, the most popular educational platform on the Flow Blockchain.`
		},
		{
			title: "User Guide",
			icon: "ion:document-text",
			description: "Explore the User Guide, an educational experience around NFTs to teach you everything there is to know about metadata, smart contracts, decentralized storage, and more."
		},
		{
			title: "Ask in Emerald City",
			icon: "ion:chatbubbles",
			description: `Want to join a community filled with developers who are also interested in developing NFT smart contracts on the Flow Blockchain? Join the <a href="https://discord.gg/emeraldcity" target="_blank">Emerald City Discord</a>!`
		}
	]
</script>

<div class="background">
	<Section>
		<Container width="large">
			<Stack>
				<h2>Learn to develop NFTs</h2>
				<AdaptableGrid minWidth="18rem">
					{#each tools as tool}
						<Feature title={tool.title} description={tool.description} background={true} center={true}>
							<Ball accent={true} icon={tool.icon} size="2.4rem"/>
						</Feature>
					{/each}
				</AdaptableGrid>
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
	}
</style>
