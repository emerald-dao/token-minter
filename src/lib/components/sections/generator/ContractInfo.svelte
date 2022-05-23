<script>
	import { Section, Container, Button, Stack, AdaptableGrid } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { deployContract } from "../../../../flow/actions.js";
	import { contractCode, contractInfo, user } from "../../../../flow/stores.js";
	import Transaction from "$lib/components/flow/Transaction.svelte";
	import { createForm } from 'felte';
  
	// function addParameter(name, type) {
  //   if (name && !$contractInfo.parameters.includes(name)) {
  //     $contractInfo.parameters.push(name);
	// 		$contractInfo.parameterFields += "\n			pub let " + name + ": " + type;
	// 		$contractInfo.parameterInits += ",\n				" + name + ": " + type;
	// 		$contractInfo.parameterSets += "\n				self." + name + " = " + name;
	// 		$contractInfo.parameterMatches += ",\n					" + name + ": " + name;
	// 	}
	// }
  
	export let initialValues;
  export let onNext = deployContract();
  export let onBack;
	// let fieldName;
	// let fieldType;

  
  const { form, data } = createForm({ onNext });
</script>

<svelte:head>
	<title>Contract Generatord</title>
</svelte:head>

<div>
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
	
				
				<!-- <button 
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
				</div> -->
	
				<Button type="button" on:click="{() => onBack($data)}">
					Previous page
				</Button>
				<Button type="submit" class="small" on:click="{() => onNext()}">Next</Button>
			</form>
		</Stack>
	
		<Transaction /> 
			
		{#if $user?.loggedIn}
			<PrismJS code={$contractCode} />
		{:else}
			<p>Please connect Flow Account to see the code</p>
		{/if}
	</AdaptableGrid>
</div>

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