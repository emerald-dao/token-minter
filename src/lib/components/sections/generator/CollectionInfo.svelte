<script>
	import { createForm } from "felte";
	import { contractInfo } from "../../../../flow/stores.js";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number } from "yup";
	import { validator } from "@felte/validator-yup";

	// TODO: Make dynamic schema
	const schema = object({
		name: string().required(),
		payment: number().required(),
		description: string().required(),
	});

	const { form, errors } = createForm({
		onSubmit() {
			onSubmitAction();
		},
		extend: [validator({ schema })],
	});

	let files;
	$: if (files) {
		const file = files[0];
		$contractInfo.image = file;
	}
</script>

<form use:form>
	<!-- Generate input values from the collectionOptions object -->
	<div class="inputs-wrapper">
		{#each collectionOptions as option}
			<div class="input">
				<label for={option.bindValue}>{option.name}</label>
				{#if option.helperText}
					<span class="helper-text">{option.helperText}</span>
				{/if}
				{#if option.type === "file"}
					<input
						name={option.bindValue}
						id={option.bindValue}
						placeholder={option.placeholder}
						type="file"
						bind:files
						class:input-error={$errors[option.bindValue]}
						class:input-ok={!$errors[option.bindValue]} />
				{:else}
					<input
						name={option.bindValue}
						id={option.bindValue}
						placeholder={option.placeholder}
						{...{ type: option.type }}
						bind:value={$contractInfo[option.bindValue]}
						class:input-error={$errors[option.bindValue]}
						class:input-ok={!$errors[option.bindValue]} />
				{/if}
				<div class="error-div">
					{#if $errors[option.bindValue]}
						<span class="error">{$errors[option.bindValue]}</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
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

			.input {
				display: flex;
				flex-direction: column;
				margin-bottom: 1em;

				.error-div {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					height: 1ch;
				}
			}
		}
	}
</style>
