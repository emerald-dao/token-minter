<script>
	import { Section, Container, AdaptableGrid } from "$lib/components/atoms/index";
</script>

<Section>
	<Container>
		<div class="flex">
			<h2>Create Your NFT Collection in Seconds</h2>
			<!-- TODO: ADD GENERATOR PREVIEW -->
			<AdaptableGrid>
				<div class="feature">
					<h4>Feature 1</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div class="feature">
					<h4>Feature 2</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div class="feature">
					<h4>Feature 3</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
				<div class="feature">
					<h4>Feature 4</h4>
					<p>Aliquip est Lorem velit incididunt aute. Et nostrud reprehenderit dolore culpa sint enim. Nulla culpa labore sunt id aliquip ea dolore pariatur laborum do sint.</p>
				</div>
			</AdaptableGrid>
		</div>
	</Container>
</Section>

<style type="scss">
  .flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
	}

  .feature {
		text-align: left;
		
		h4 {
			font-size: var(--fs-400);
			margin-bottom: 0.5em;
		}

		p {
			font-size: var(--fs-300);
			max-width: 45ch;
		}
	}
</style>