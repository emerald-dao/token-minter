<script>
	import { Section, Container, Button, Stack, AdaptableGrid } from "$lib/components/atoms/index";
	import { createForm } from 'felte';
	import { contractCode, contractInfo, user } from "../../../../flow/stores.js";


  export let onNext = console.log("submit");

  const { form, data } = createForm({ onNext });
</script>

<svelte:head>
	<title>Collection Information</title>
</svelte:head>


<Stack align="start">
	<form use:form>

		<label for="collection-name">Collection Name</label>
		<input
			name="collection-name"
			id="collection-name"
			type="text"
			placeholder="Your Awesome Collection"
			bind:value={$contractInfo.name}
		/>
		
		<label for="price">Price</label>
		<span class="helper-text">Define the price of each NFT.</span>
		<input
			name="price"
			id="price"
			type="number"
			bind:value={$contractInfo.payment}
		/>

		<label for="max-supply">Max Supply</label>
		<span class="helper-text">Define the maximum of NFTs that will be in your collection</span>
		<input
			name="max-supply"
			id="max-supply"
			type="number"
			bind:value={$contractInfo.maxSupply}
		/>

		<Button type="submit" class="small" on:click="{() => onNext()}">Next</Button>
	</form>
</Stack>

<style type="scss">

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
		width: 100%;
		
		input {
			margin-bottom: 2rem;
		}

		.helper-text {
			font-size: var(--fs-200);
			color: var(--clr-font-text-soft);
			margin-bottom: 0.6em;
		}
	}
</style>