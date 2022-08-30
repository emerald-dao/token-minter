<script>
	import { Section, Container, Button, Stack, Tagline } from "$atoms";
</script>

<div class="background">
	<Section class="padding-top-none">
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
</div>

<style type="scss">
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
		background: 
      radial-gradient(ellipse at right, var(--clr-primary-main-t4), transparent),
      radial-gradient(ellipse at top, var(--clr-primary-soft-t3), transparent),
      radial-gradient(ellipse at left, var(--clr-accent-main-t2), transparent),
      radial-gradient(ellipse at bottom, var(--clr-accent-soft-t2), transparent);
		backdrop-filter: blur(50px);
		border: 3px var(--clr-accent-main-t8) solid;
	}
</style>