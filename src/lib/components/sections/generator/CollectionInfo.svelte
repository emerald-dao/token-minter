<script>
	import { createForm } from "felte";
	import { canMakeReservation, getAllContractNames, hasEmeraldPass } from "../../../../flow/actions.js";
	import { contractInfo, user } from "../../../../flow/stores.js";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number, mixed } from "yup";
	import { validator } from "@felte/validator-yup";
	import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
	import { Button, Stack } from "$lib/components/atoms/index";
	import { onNext } from "$lib/stores/generator/updateFunctions.js";
	import {
    activeStep,
    stepsArray,
  } from "$lib/stores/generator/GeneratorGeneralStore";

	const schema = object({
		name: string().required("Of course your collection needs a name! 🤷‍♂️"),
		payment: number().required(
			"If your NFTs don't have a price, you can't sell them 🤑"
		),
		description: string().required("Don't be shy, write a description 🤗"),
		image: mixed().required("We also need an image! 📸"),
		bannerImage: mixed(),
		website: string().url(),
		discord: string().url(),
		twitter: string().url(),
	});

	const { form, errors } = createForm({
		extend: [validator({ schema })],

		onSubmit(){
			onNext(checkContracts)
		}
	});

	async function checkContracts() {
		const contracts = await getAllContractNames($user.addr);

		// CHECK TO SEE IF THEY HAVE EMERALD PASS HERE
		const activeEmeraldPass = await hasEmeraldPass($user.addr);

		$contractInfo.contractName = activeEmeraldPass ? $contractInfo.name.replace(/\s+/g, "") : "Touchstone" + $contractInfo.name.replace(/\s+/g, "");
		
		if (contracts.includes($contractInfo.contractName)) {
			return {
				error: "This collection name is already deployed to your account. You cannot use it again."
			};
		}

		if (activeEmeraldPass) {
			const userCanMakeReservation = await canMakeReservation($contractInfo.contractName);
			if (!userCanMakeReservation) {
				return {
					error:	"Someone has already used this Collection Name. Please choose another."
				}
			}
		}

		return true;
	}

	let images;
	$: if (images) {
		console.log(images);
		const file = images[0];
		$contractInfo.imageName = file.name;
		$contractInfo.image = file;
	}

	let bannerImages;
	$: if (bannerImages) {
		const file = bannerImages[0];
		$contractInfo.bannerImageName = file.name;
		$contractInfo.bannerImage = file;
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
				{#if option.bindValue === "image"}
					<input
						name={option.bindValue}
						id={option.bindValue}
						placeholder={option.placeholder}
						type="file"
						bind:files={images}
						class:input-error={$errors[option.bindValue]}
						class:input-ok={!$errors[option.bindValue]} />
				{:else if option.bindValue === "bannerImage"}
					<input
						name={option.bindValue}
						id={option.bindValue}
						placeholder={option.placeholder}
						type="file"
						bind:files={bannerImages}
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
		rightIcon="arrow-forward-circle"
		state={$stepsArray[$activeStep].state}
	>
		{#if $stepsArray[$activeStep].state === "loading"}
      Checking Collection Availability
    {:else}
			Next
		{/if}
	</Button>
</GeneratorStepLayout>

<style type="scss">
	form {
		gap: 2.2rem;

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
