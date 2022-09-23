<script>
	import { Section, Container, Button, Stack, Tagline } from "$atoms";
	import { GradientWrapper, Gradient } from '$components/gradients';
</script>

<div class="background">
	<Section>
		<Container>
			<div class="background-card">
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
			</div>
		</Container>
	</Section>
	<GradientWrapper>
		<Gradient left="58%" top="23%" blur="70px" width="500px" height="560px"/>
		<Gradient left="2%" top="10%" blur="70px" width="490px" height="470px"/>
		<Gradient left="45%" top="58%" blur="70px" width="230px" height="310px" color="var(--clr-background-gradient-secondary)"/>
		<Gradient left="25%" top="0%" blur="70px" width="150px" height="210px" color="var(--clr-background-gradient-secondary)"/>
	</GradientWrapper>
</div>

<style type="scss">
	.background {
		position: relative;
		border-top: 1px var(--clr-accent-main-t6) solid;
	}
	h2 {
		color: var(--clr-font-heading);
		text-align: center;
	}

	p {
		text-align: center;
		color: var(--clr-font-text);
	}

	.background-card {
		padding: 5em;
		border-radius: 1rem;
		background-color: var(--clr-background-primary);
		border: 1px var(--clr-accent-main-t8) solid;
		box-shadow: 0 0 10px 0 var(--clr-background-primary-t4);
	}
</style>