<script>
	import { Stack } from "$lib/components/atoms/index";
	import { createForm } from 'felte';
	import { contractInfo } from "../../../../flow/stores.js";
	import { onMount } from "svelte";
	import collectionOptions from "$lib/config/collectionOptions.js";

  const { form } = createForm();
</script>

<Stack align="start">
	<form use:form>

		<!-- Generate input values from the collectionOptions object -->
		{#each collectionOptions as option }
			<label for={option.bindValue}>{option.name}</label>
			{#if option.helperText}
				<span class="helper-text">{option.helperText}</span>
			{/if}
			<input 
				name={option.bindValue}
				id={option.bindValue}
				placeholder={option.placheholder}
				{...{ type: option.type }}
				bind:value={$contractInfo[option.bindValue]} 
			/>
		{/each}

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