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
					<h4>STEP 1</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div>
					<h4>STEP 2</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div>
					<h4>STEP 3</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div>
					<h4>STEP 4</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
			</Stack>
		</AdaptableGrid>
	</Container>
</Section>

<style type="scss">
	@use "../../../styles/abstracts" as *;

	h4 {
		font-size: var(--fs-400);
		margin-bottom: 1em;
		margin-top: 2em;
	}
	.sticky {
		@include mq(medium) {
			position: sticky;
			top: 4rem;
			height: fit-content;
		}
	}
</style>