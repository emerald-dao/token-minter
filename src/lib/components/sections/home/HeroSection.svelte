<script>
	import Icon from "@iconify/svelte";
	import { Section, Container, Button, AdaptableGrid, Marquee, Stack } from "$lib/components/atoms/index";
</script>

<Section class="padding-top-small">
	<Container class="width-large">
		<AdaptableGrid>
			<Stack align="start">
				<h1>Tools for creating 
					<span class="accent">NFT Collections and Contracts</span> 
					in the Flow Blockchain
				</h1>
				<p>Cupidatat amet irure adipisicing ut. Esse incididunt aliquip ex enim nostrud magna ea nostrud id mollit occaecat. Duis id voluptate veniam tempor velit id fugiat ut.</p>
				<Button>Start</Button>
			</Stack>
			<Stack align="center" justify="center">
				<video width="100%" height="100%" autoplay loop muted>
					<source src="emerald.webm" type="video/webm">
					<track kind="captions"/>
					Your browser does not support the video tag.
				</video>
			</Stack>
		</AdaptableGrid>
	</Container>
</Section>
<Marquee repeat="{10}">
		<div class="marquee-element">
			<span>CRAFTED WITH 💜 BY&nbsp;</span> EMERALD CITY DAO
		</div>
		<div class="marquee-element emerald-wrapper">
			<Icon icon="ion:diamond-outline"/>
		</div>
</Marquee>

<style type="scss">
  h1 {
		font-size: var(--fs-700);
		font-weight: 600;
		text-shadow: none;
		
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
		
		span {
			font-style: italic;
		}
  }

	.emerald-wrapper {
		margin-top: -0.3rem;
		color: var(--clr-primary-main)
	}
</style>