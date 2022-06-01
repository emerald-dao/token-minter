<script>
	import { StepsButtons} from "$lib/components/atoms/index";
	import { createForm } from 'felte';
	import { contractInfo } from "../../../../flow/stores.js";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number } from 'yup';
	import { validator } from '@felte/validator-yup';

	export let onSubmitAction;
  export let onSubmitText;

	// TODO: Make dynamic schema
	const schema = object({
		name: string().required(),
		payment: number().required().positive(),
		maxSupply: number().required().positive(),
	})

  const { form, errors, data } = createForm({
		onSubmit() {
      onSubmitAction();
    },
		extend: [
			validator({ schema }),
		],
	});
</script>

<form use:form>

	<!-- Generate input values from the collectionOptions object -->
	<div class="inputs-wrapper">
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
				class:input-ok="{!$errors[option.bindValue]}"
			/>
			{#if $errors[option.bindValue]}
				<span class="error">{$errors[option.bindValue]}</span>
			{/if}
		{/each}
	</div>

	<StepsButtons onSubmitText={onSubmitText} submit errors={$errors}/>
</form>

<style type="scss">
	form {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;

		.inputs-wrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
		}
	}
</style>
