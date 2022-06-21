<script>
	import Icon from "@iconify/svelte";
	import { Section, Container, Button, AdaptableGrid, Marquee, Stack } from "$lib/components/atoms/index";
</script>

<Section class="padding-top-small">
	<Container class="width-large">
		<AdaptableGrid>
			<Stack align="start">
				<h1>Tools for creating 
					<span>NFT Collections and Contracts</span> 
					in the Flow Blockchain
				</h1>
				<p>Cupidatat amet irure adipisicing ut. Esse incididunt aliquip ex enim nostrud magna ea nostrud id mollit occaecat. Duis id voluptate veniam tempor velit id fugiat ut.</p>
				<Button>Start</Button>
			</Stack>
			<div class="grid-child">
				<video width="100%" height="100%" autoplay loop muted>
					<source src="emerald.webm" type="video/webm">
					<track kind="captions"/>
					Your browser does not support the video tag.
				</video>
			<div/>
		</AdaptableGrid>
	</Container>
</Section>
<Marquee repeat="{10}">
		<div class="marquee-element">
			CRAFTED BY EMERALD CITY DAO
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
			color: var(--clr-primary-main);
			text-shadow: 3px 3px 0 var(--clr-accent-soft);
		}
	}

  .marquee-element {
    display: flex;
    align-items: center;
    justify-content: center;
		margin-inline: 3rem
  }

	.emerald-wrapper {
		margin-top: -0.3rem;
	}

</style>