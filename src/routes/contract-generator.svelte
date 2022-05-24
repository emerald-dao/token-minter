<script>
	import { Section, Container, Button, Stack, AdaptableGrid } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { deployContract, getTemplates, logIn, unauthenticate } from "../flow/actions.js";
	import { contractCode, contractInfo, user } from "../flow/stores.js";
	import Transaction from "$lib/components/flow/Transaction.svelte";
	import { createForm } from 'felte';

  const { form } = createForm({
		onSubmit(values, context) {
			deployContract();
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

<Section>
	<Container>
		<div class="left-side">
			<Button class="small" on:click={logIn}>Log In</Button>
			<Button class="small" on:click={unauthenticate}>Log Out</Button>
			<h1>User: {$user?.addr}</h1>
			<button on:click={getTemplates}>GET TEMPLATES</button>
			<label for="contract-name">Contract Name</label>
			<input
				id="contract-name"
				bind:value={$contractInfo.name}
				type="text"
				placeholder="ExampleNFT"
			/>

			<label for="max-supply">Max Supply</label>
			<input
				bind:value={$contractInfo.maxSupply}
				type="number"
				min="1"
				placeholder="100"
				id="max-supply"
			/>

					<fieldset>
						<legend>Minting Options</legend>
						
						<input 
							name="open-minting" 
							id="open-minting" 
							type="checkbox"
							bind:checked={$contractInfo.openMinting}
						>
						<label for="open-minting">Open Minting</label>

						<input 
							name="start-minting" 
							id="start-minting" 
							type="checkbox"
							bind:checked={$contractInfo.startMinting}
						>
						<label for="start-minting">Start Minting</label>
					</fieldset>
					
					<button 
						type="button" 
						on:click={() => addParameter(fieldName, fieldType)}
					>
						Add Parameter
					</button>
					<div>
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