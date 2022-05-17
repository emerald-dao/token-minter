<script>
	import { Section, Container, Button } from "$lib/components/atoms/index";
</script>

<Section>
	<Container width="large">
		<div class="grid-wrapper">
			<div class="grid-child sticky">
				<h2>Learn to develop NFTs</h2>
				<div class="buttons-group">
					<Button class="small ghost">Emerald Academy</Button>
					<Button class="small">Guide</Button>
				</div>
			</div>
			<div class="grid-child">
				<div class="step">
					<h5 class="tagline">STEP 1</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div class="step">
					<h5 class="tagline">STEP 2</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div class="step">
					<h5 class="tagline">STEP 3</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div class="step">
					<h5 class="tagline">STEP 4</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
			</div>
		</div>
	</Container>
</Section>

<style type="scss">
  .grid-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(25rem, 100%), 1fr));
		width: 100%;
		grid-gap: 5rem;

		.grid-child {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		.sticky {
			position: sticky;
			top: 4rem;
			height: fit-content;
		}
	}
</style>