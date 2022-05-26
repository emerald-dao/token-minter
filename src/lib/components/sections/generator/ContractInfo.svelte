<script>
	import { Stack } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { contractCode, contractInfo, user } from "../../../../flow/stores.js";
	import Transaction from "$lib/components/flow/Transaction.svelte";
	import { transactionInProgress } from "../../../../flow/stores";
	import { createForm } from 'felte';

	import contractOptions from '$lib/config/contractOptions.js'

  const { form } = createForm();
</script>

{#if $transactionInProgress}
	<Transaction />
{:else}
	<div class="main-grid">
		<Stack align="start">
			<form use:form>
				<!-- Generate input values from the contractOptions object -->
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
			</form>
		</Stack>
		<PrismJS code={$contractCode} />
	</div>
{/if}

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