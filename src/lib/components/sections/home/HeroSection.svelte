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
	import { theme } from '$stores/ThemeStore'
</script>

<div class="background">
	<Section>
		<Container class="width-large">
			<AdaptableGrid>
				<Stack align="start">
					<h1>
						Tools for creating
						<span class="accent">NFT Collections and Contracts</span>
						on the Flow Blockchain
					</h1>
					<p>
						Create your own NFT Collections without knowing any code. Learn all
						about NFTs on the Flow Blockchain.
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
		font-weight: 900;

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

	.background {
		background: radial-gradient(
			ellipse at right,
			var(--clr-primary-main-t8),
			transparent
		);
		backdrop-filter: blur(50px);
	}

	video {
		border-radius: 3rem;
	}
</style>
