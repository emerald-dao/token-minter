<script>
	import {
		Section,
		Container,
		Button,
		AdaptableGrid,
		Stack,
		Ball,
		Feature
	} from "$lib/components/atoms/index";

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

<Section>
	<Container width="large">
		<AdaptableGrid>
			<div class="sticky">
				<Stack align="start">
					<h2>Learn to develop NFTs</h2>
					<Stack direction="row">
						<Button href="https://academy.ecdao.org/" leftIcon="school" target="_blank"
							>Emerald Academy</Button>
					</Stack>
				</Stack>
			</div>
			<Stack>
				{#each tools as tool}
					<Feature title={tool.title} description={tool.description}>
						<Ball icon={tool.icon} size="2.4rem"/>
					</Feature>
				{/each}
			</Stack>
		</AdaptableGrid>
	</Container>
</Section>

<style type="scss">
	@use "../../../styles/abstracts" as *;

	.sticky {
		@include mq(medium) {
			position: sticky;
			top: 4rem;
			height: fit-content;
		}
	}
</style>
