<script>
	import { Section, Container, Button } from "$lib/components/atoms/index";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Section padding="large">
	<Container width="large">
		<div class="grid-wrapper">
			<div class="grid-child">
				<h1>Tools for creating 
					<span>NFT Collections and Contracts</span> 
					in the Flow Blockchain
				</h1>
				<p>Cupidatat amet irure adipisicing ut. Esse incididunt aliquip ex enim nostrud magna ea nostrud id mollit occaecat. Duis id voluptate veniam tempor velit id fugiat ut.</p>
				<Button>Start</Button>
			</div>
			<div class="grid-child">
				<!-- TODO: ADD 3D SHAPE -->
			<div/>
		</div>
	</Container>
</Section>
<Section padding="large">
	<Container>
		<div class="flex">
			<!-- TODO: ADD 3D SHAPE -->
			<span class="tagline">CRATE YOUR COLLECTION</span>
			<h2>Token Minter</h2>
			<p>Deploy collections and contract without code.</p>
			<div class="buttons-group">
				<Button class="small ghost">Contract Generator</Button>
				<Button class="small">Collection Generator</Button>
			</div>
		</div>
	</Container>
</Section>
<Section padding="large">
	<Container>
		<div class="flex">
			<h2>Create Your NFT Collection in Seconds</h2>
			<!-- TODO: ADD GENERATOR PREVIEW -->
			<div class="grid-wrapper">
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
			</div>
		</div>
	</Container>
</Section>
<Section padding="large">
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
<Section padding="large">
	<Container>
		<div class="flex invitation">
			<span class="tagline">EMERALD CITY</span>
			<h2>Join the community</h2>
			<p>
				We are the first DAO on the Flow Blockchain 
				<br/>
				<b>Educate, build and goverm</b>
			</p>
			<Button>Join Discord</Button>
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


	h1 {
		font-size: var(--fs-700);
		font-weight: 600;
		text-shadow: 3px 3px 0 var(--clr-accent-hover);

		span {
			color: var(--clr-primary-main);
		}
	}

	h2 {
		font-weight: 600;
		text-shadow: 3px 3px 0 var(--clr-accent-hover);
	}

	.flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
	}

	.buttons-group {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.tagline {
		color: var(--clr-primary-main);
		font-family: var(--font-mono);
		font-size: var(--fs-300);
		font-weight: 100;
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

	.invitation {
		background-color: var(--clr-primary-main);
		border-radius: 0.4rem;
		padding: 3rem;
		box-shadow: var(--clr-accent-hover) 8px 8px, var(--clr-accent-soft) 16px 16px;

		h2 {
			color: var(--clr-font-heading-inverse);
		}

		p {
			color: var(--clr-font-text-inverse);
		}
	}
</style>