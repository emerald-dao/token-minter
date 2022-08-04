<script>
	import { StepsButtons } from "$lib/components/atoms/index";
	import { createForm } from "felte";
	import { getAllContractNames } from "../../../../flow/actions.js";
	import { contractInfo, user } from "../../../../flow/stores.js";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number } from "yup";
	import { validator } from "@felte/validator-yup";

	export let onSubmitAction;
	export let onSubmitText;

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

	async function checkContracts(proposedName) {
		let contracts = await getAllContractNames($user.addr);
		if (contracts.includes(proposedName.replace(/\s+/g, ""))) {
			$errors["name"] = "This contract name is already taken :(";
		}
	}

	$: if ($contractInfo.name) {
		checkContracts($contractInfo.name);
	}

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
			{#if $errors[option.bindValue]}
				<span class="error">{$errors[option.bindValue]}</span>
			{/if}
		{/each}
	</div>

	<StepsButtons {onSubmitText} submit errors={$errors} />
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
