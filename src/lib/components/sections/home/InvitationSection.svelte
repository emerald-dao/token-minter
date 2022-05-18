<script>
	import { Section, Container, Button, Stack } from "$lib/components/atoms/index";
</script>

<Section>
	<Container>
		<div class="invitation">
			<Stack>
				<span class="tagline">EMERALD CITY</span>
				<h2>Join the community</h2>
				<p>
					We are the first DAO on the Flow Blockchain 
					<br/>
					<b>Educate, build and goverm</b>
				</p>
				<Button>Join Discord</Button>
			</Stack>
		</div>
	</Container>
</Section>

<style type="scss">
  .invitation {
		background-color: var(--clr-accent-soft);
    border-radius: 0.4rem;
		padding: 4rem;
		box-shadow: var(--clr-accent-main) 8px 8px, var(--clr-accent-hover) 16px 16px;

		h2 {
			color: var(--clr-font-heading);
		}

		p {
			color: var(--clr-font-text);
		}
	}
</style>