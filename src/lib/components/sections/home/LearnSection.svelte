<script>
	import {
		Section,
		Container,
		Button,
		AdaptableGrid,
		Stack,
	} from "$lib/components/atoms/index";
</script>

<Section>
	<Container width="large">
		<AdaptableGrid>
			<div class="sticky">
				<Stack align="start">
					<h2>Learn to develop NFTs</h2>
					<Stack direction="row">
						<Button class="small ghost">Emerald Academy</Button>
						<Button class="small">User Guide</Button>
					</Stack>
				</Stack>
			</div>
			<Stack>
				<div>
					<h4>Emerald Academy</h4>
					<p>
						Check out <a href="https://academy.ecdao.org/" target="_blank"
							>Emerald Academy</a
						>, the most popular educational platform on the Flow Blockchain.
					</p>
				</div>
				<div>
					<h4>User Guide</h4>
					<p>
						Explore the User Guide, an educational experience around NFTs to
						teach you everything there is to know about metadata, smart
						contracts, decentralized storage, and more.
					</p>
				</div>
				<div>
					<h4>Ask in Emerald City</h4>
					<p>
						Want to join a community filled with developers who are also
						interested in developing NFT smart contracts on the Flow Blockchain?
						Join the <a href="https://discord.gg/emeraldcity" target="_blank"
							>Emerald City Discord</a
						>!
					</p>
				</div>
			</Stack>
		</AdaptableGrid>
	</Container>
</Section>

<style type="scss">
	@use "../../../styles/abstracts" as *;

	a {
		text-decoration: none;
	}

	h4 {
		font-size: var(--fs-400);
		margin-bottom: 1em;
		margin-top: 2em;
	}
	.sticky {
		@include mq(medium) {
			position: sticky;
			top: 4rem;
			height: fit-content;
		}
	}
</style>
