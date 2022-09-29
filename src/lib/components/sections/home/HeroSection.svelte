<script>
	import {
		Section,
		Container,
		Button,
		AdaptableGrid,
		Marquee,
		Stack,
		TouchstoneIcon,
	} from "$atoms";
	import { newCollection } from "$stores/ActiveStepStore";
	import { theme } from "$stores/ThemeStore";
	import { GradientWrapper, Gradient } from "$components/gradients";
</script>

<div style="position: relative;">
	<Section class="padding-bottom-medium padding-top-medium">
		<Container class="width-large">
			<AdaptableGrid>
				<Stack align="left" justify="center">
					<h1>
						No-code
						<span class="accent">NFT Launchpad</span>
						on the Flow Blockchain
					</h1>
					<p>
						Create and deploy your own NFT Collections. Craft your own primary
						sales page. Sell your NFTs with any Flow-based token.
					</p>
					<Button
						href="/contract-generator"
						rightIcon="arrow-forward-circle"
						on:click={newCollection}>Start</Button>
				</Stack>
				<Stack align="center" justify="center">
					{#if $theme === "dark"}
						<video width="100%" height="100%" autoplay loop muted>
							<source src="emerald1.webm" type="video/webm" />
							<source src="emerald1.mp4" type="video/mp4" />
							<track kind="captions" />
							Your browser does not support the video tag.
						</video>
					{:else}
						<video width="100%" height="100%" autoplay loop muted>
							<source src="emerald1.webm" type="video/webm" />
							<source src="emerald1-white.mp4" type="video/mp4" />
							<track kind="captions" />
							Your browser does not support the video tag.
						</video>
					{/if}
				</Stack>
			</AdaptableGrid>
		</Container>
	</Section>
	<!-- <GradientWrapper>
	<Gradient left="58%" top="23%" blur="70px" width="350px" height="350px" color="var(--clr-background-gradient-secondary)"/>
	<Gradient left="48%" top="5%" blur="70px" width="300px" height="300px"/>
	<Gradient left="65%" top="35%" blur="70px" width="450px" height="450px"/>
</GradientWrapper> -->
</div>
<Marquee repeat={10}>
	<div class="marquee-element">
		<span>CRAFTED WITH 💜 BY&nbsp;</span> EMERALD CITY DAO
	</div>
	<div class="marquee-element emerald-wrapper">
		<TouchstoneIcon />
	</div>
</Marquee>

<style type="scss">
	h1 {
		font-size: var(--fs-700);
		--font-weight: 600;

		span {
			color: var(--clr-accent-main);
		}
	}

	.marquee-element {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-inline: 3rem;
		letter-spacing: 0.3em;
		font-size: var(--fs-200);
		padding-block: 0.4rem;
		font-weight: 500;

		span {
			font-style: italic;
		}
	}

	video {
		border-radius: 3rem;
	}
</style>
