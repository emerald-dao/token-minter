<script>
	import {
		Section,
		Container,
		Button,
		Stack,
		Tagline,
	} from "$lib/components/atoms/index";
	import { dappTitle } from "$lib/config/config";
</script>

<Section>
	<Container>
		<Stack>
			<Tagline>CREATE YOUR COLLECTION</Tagline>
			<h2>{dappTitle}</h2>
			<p>Create an NFT collection and deploy a smart contract without code.</p>
			<div class="buttons-group">
				<Button class="small ghost">User Guide</Button>
				<Button class="small">Collection Generator</Button>
			</div>
			<video width="50%" height="100%" autoplay loop muted>
				<source src="emerald2.webm" type="video/webm" />
				<track kind="captions"/>
				Your browser does not support the video tag.
			</video>
		</Stack>
	</Container>
</Section>

<style type="scss">
	.buttons-group {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}
</style>
