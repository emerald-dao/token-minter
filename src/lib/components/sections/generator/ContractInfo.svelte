<script>
	import { Stack } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { deployContract } from "../../../../flow/actions.js";
	import { contractCode, contractInfo, user } from "../../../../flow/stores.js";
	import Transaction from "$lib/components/flow/Transaction.svelte";
	import { createForm } from 'felte';

	import contractOptions from '$lib/config/contractOptions.js'
  
	// function addParameter(name, type) {
  //   if (name && !$contractInfo.parameters.includes(name)) {
  //     $contractInfo.parameters.push(name);
	// 		$contractInfo.parameterFields += "\n			pub let " + name + ": " + type;
	// 		$contractInfo.parameterInits += ",\n				" + name + ": " + type;
	// 		$contractInfo.parameterSets += "\n				self." + name + " = " + name;
	// 		$contractInfo.parameterMatches += ",\n					" + name + ": " + name;
	// 	}
	// }
  
	// export let initialValues;
  export let onNext = deployContract();
	// let fieldName;
	// let fieldType;

  const { form, data } = createForm({ onNext });
</script>

<svelte:head>
	<title>Contract Generatord</title>
</svelte:head>

<div class="main-grid">
	<Stack align="start">
		<form use:form>
			{#each contractOptions as option}	
				<label 
					class="checkbox-label" 
					class:checkbox-label-with-number="{option.withNumber}"
					for={option.bindValue}
				>
					<input 
						name={option.bindValue}
						id={option.bindValue}
						type="checkbox"
						bind:checked={$contractInfo[option.bindValue]}
					>
					{option.name}
					{#if option.withNumber}
						<input 
							name={option.bindValue + 'Number'}
							id={option.bindValue + 'Number'}
							type="number"
							disabled={$contractInfo[option.bindValue] ? !$contractInfo[option.bindValue] : true}
							placeholder="Number"
							bind:value={$contractInfo[option.bindValue + 'Number']}
						>
					{/if}
				</label>
			{/each}

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
		</form>
	</Stack>

	<Transaction /> 
		
	{#if $user?.loggedIn}
		<PrismJS code={$contractCode} />
	{:else}
		<p>Please connect Flow Account to see the code</p>
	{/if}
</div>

<style type="scss">
	.main-grid {
		display: grid;
		grid-template-columns: 0.4fr 1fr;
		gap: 3rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
</style>