<script>
	import { Section, Container, Button, Stack, Tagline, TransparentCard } from "$lib/components/atoms/index";
</script>

<Section>
	<Container>
		<TransparentCard accent={true} padding="4rem">
			<Stack>
				<Tagline>Emerald City DAO</Tagline>
				<h2>Join the community</h2>
				<p>
					We are the first DAO on the Flow Blockchain 
					<br/>
					<b>Educate, build and govern</b>
				</p>
				<Button leftIcon="logo-discord" target="_blank" href="https://discord.com/invite/emeraldcity">Join Discord</Button>
			</Stack>
		</TransparentCard>
	</Container>
</Section>

<style type="scss">
	h2 {
		color: var(--clr-font-heading);
		text-align: center;
	}

	p {
		text-align: center;
		color: var(--clr-font-text);
	}
</style>