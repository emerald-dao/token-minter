<script>
	import { createForm } from "felte";
	import { getAllContractNames } from "../../../../flow/actions.js";
	import { contractInfo, user } from "../../../../flow/stores.js";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number, mixed } from "yup";
	import { validator } from "@felte/validator-yup";
	import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
	import { Button, Stack } from "$lib/components/atoms/index";
	import { onNext } from "$lib/stores/generator/updateFunctions.js";

	// TODO: Make dynamic schema
	const schema = object({
		name: string().required("Of course your collection needs a name! 🤷‍♂️"),
		payment: number().required(
			"If your NFTs don't have a price, you can't sell them 🤑"
		),
		description: string().required("Don't be shy, write a description 🤗"),
		image: mixed().required("We also need an image! 📸"),
		bannerImage: string(),
		website: string().url(),
		discord: string().url(),
		twitter: string().url(),
	});

	const { form, errors } = createForm({
		onSubmit() {
			onNext();
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

<GeneratorStepLayout>
	<form use:form slot="main-content" id="collection-info">
		<!-- Generate input values from the collectionOptions object -->
		<!-- <Stack direction="column"> -->
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
		<!-- </Stack> -->
	</form>
	<Button
		slot="buttons"
		type="submit"
		form="collection-info"
		rightIcon="arrow-forward-circle">Next</Button>
</GeneratorStepLayout>

<style type="scss">
	form {
		gap: 1em;

		.input {
			display: flex;
			flex-direction: column;
			width: 100%;

			.error-div {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				height: 0.5ch;
			}
		}
	}
</style>
