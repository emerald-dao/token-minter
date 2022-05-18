<script>
	import { Section, Container, Button, Stack, AdaptableGrid } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { deployContract } from "../flow/actions.js";
	import { contractCode, contractInfo, user } from "../flow/stores.js";
	import Transaction from "$lib/components/flow/Transaction.svelte";
	import { createForm } from 'felte';

  const { form } = createForm({
		onSubmit(values, context) {
			alert('success');
		},
	})

	function addParameter(name, type) {
		if (name && !$contractInfo.parameters.includes(name)) {
			$contractInfo.parameters.push(name);
			$contractInfo.parameterFields += "\n			pub let " + name + ": " + type;
			$contractInfo.parameterInits += ",\n				" + name + ": " + type;
			$contractInfo.parameterSets += "\n				self." + name + " = " + name;
			$contractInfo.parameterMatches += ",\n					" + name + ": " + name;
		}
	}

	let fieldName;
	let fieldType;
</script>

<svelte:head>
	<title>Contract Generatord</title>
</svelte:head>

<Section class="padding-top-none">
	<Container class="width-large">
		<h1>Contract Generator</h1>
		<AdaptableGrid>
			<Stack align="start">
				{#if $user?.addr}
					<h2>User: {$user?.addr}</h2>
				{:else}
					<h2>Connect Flow Account</h2>
				{/if}
				<form use:form>
					<label for="contract-name">Contract Name</label>
					<input
						name="contract-name"
						id="contract-name"
						type="text"
						placeholder="ExampleNFT"
						bind:value={$contractInfo.name}
					/>
					
					<label for="max-supply">Max Supply</label>
					<input
						name="max-supply"
						id="max-supply"
						type="number"
						min="1"
						placeholder="100"
						bind:value={$contractInfo.maxSupply}
					/>
					
					<label for="price">Price</label>
					<input
						name="price"
						id="price"
						type="number"
						min="1"
						placeholder="10"
						bind:value={$contractInfo.payment}
					/>

					<Button
						class="small"
						on:click={() => ($contractInfo.openMinting = !$contractInfo.openMinting)}
					>
						Open Minting: {$contractInfo.openMinting}
					</Button>
					
					<Button
						class="small"
						on:click={() => ($contractInfo.startMinting = !$contractInfo.startMinting)}
					>
						Start Minting: {$contractInfo.startMinting}
					</Button>

					<Button class="small" on:click={() => addParameter(fieldName, fieldType)}>
						Add Parameter
					</Button>
					<div class="grid">
						<input bind:value={fieldName} type="text" />
						<select bind:value={fieldType} name="types" id="types">
							<option value="String">String</option>
							<option value="UInt64">UInt64</option>
							<option value="Bool">Bool</option>
							<option value="Int">Int</option>
						</select>
					</div>

					<Button type="submit" class="small">Deploy Contract</Button>
				</form>
			</Stack>
	
			<Transaction /> 
				
			{#if $user?.loggedIn}
				<PrismJS code={$contractCode} />
			{:else}
				<p>Please connect Flow Account to see the code</p>
			{/if}
		</AdaptableGrid>
	</Container>
</Section>

<style type="scss">
	h1 {
		font-size: var(--fs-600);
		margin-bottom: 1rem;
	}
	h2 {
		font-size: var(--fs-500)
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	input {
		margin-bottom: 2rem;
	}
</style>