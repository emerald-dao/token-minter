<script>
	import { Section, Container, Button, AdaptableGrid, Stack } from "$lib/components/atoms/index";
</script>

<Section>
	<Container width="large">
		<AdaptableGrid>
			<div class="sticky">
				<Stack align="start">
					<h2>Learn to develop NFTs</h2>
					<Stack direction="row">
						<Button class="small ghost">Emerald Academy</Button>
						<Button class="small">Guide</Button>
					</Stack>
				</Stack>	
			</div>
			<Stack>
				<div>
					<h5>STEP 1</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div>
					<h5>STEP 2</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div>
					<h5>STEP 3</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div>
					<h5>STEP 4</h5>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
			</Stack>
		</AdaptableGrid>
	</Container>
</Section>

<style type="scss">
	h5 {
		font-family: var(--font-mono);
		font-weight: 200;
		color: var(--clr-primary-main)
	}
	.sticky {
		position: sticky;
		top: 4rem;
		height: fit-content;
	}
</style>