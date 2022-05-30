<script>
	import { Stack, Button } from "$lib/components/atoms/index";
	import { createForm } from 'felte';
	import { contractInfo } from "../../../../flow/stores.js";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number } from 'yup';
	import { validator } from '@felte/validator-yup';

	const schema = object({
		name: string().required(),
		payment: number().required().positive(),
		maxSupply: number().required().positive(),
	})

	const warnSchema = object({
		name: 
			string()
			.test('is long enough', 'name must have more than two letters', (value) =>
				value ? value.length > 2 : true
			),
	});

  const { form, errors } = createForm({
		onSubmit() {
      alert('a')
    },
		extend: [
			validator({ schema }),
			validator({ schema: warnSchema, level: 'warning' }),
		],
	});
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
				class:input-error="{$errors[option.bindValue]}"
			/>
			{#if $errors[option.bindValue]}
				<span class="error">{$errors[option.bindValue]}</span>
			{/if}
		{/each}

		<!-- Make submit button active if there are no form errors -->
		{#if Object.values($errors).every(element => element === null)}
			<Button type="submit">
				Next
			</Button>
		{:else}
			<Button type="submit" disabled class="disabled">
				Next
			</Button>	
		{/if}
	</form>
</Stack>