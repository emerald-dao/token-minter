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
			<!-- TODO: ADD 3D SHAPE -->
			<Tagline>CREATE YOUR COLLECTION</Tagline>
			<h2>{dappTitle}</h2>
			<p>Create an NFT collection and deploy a smart contract without code.</p>
			<div class="buttons-group">
				<Button class="small ghost">User Guide</Button>
				<Button class="small">Collection Generator</Button>
			</div>
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
