<script>
	import { createForm } from "felte";
	import { canMakeReservation, getAllContractNames, hasEmeraldPass } from "$flow/actions.js";
	import { collectionInfo, collectionImage } from "$stores/ContractStore.js";
	import { user } from "$stores/FlowStore";
	import collectionOptions from "$lib/config/collectionOptions.js";
	import { object, string, number, mixed } from "yup";
	import { validator } from "@felte/validator-yup";
	import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
	import { Button, Input } from "$atoms";
	import { activeStep } from "$stores/ActiveStepStore";

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
			activeStep.onNext(checkContracts)
		}
	});

	async function checkContracts() {
		const contracts = await getAllContractNames($user.addr);

		// CHECK TO SEE IF THEY HAVE EMERALD PASS HERE
		const activeEmeraldPass = await hasEmeraldPass($user.addr);

		$collectionInfo.contractName = activeEmeraldPass ? $collectionInfo.name.replace(/\s+/g, "") : "Touchstone" + $collectionInfo.name.replace(/\s+/g, "");
		
		if (contracts.includes($collectionInfo.contractName)) {
			return {
				error: "This collection name is already deployed to your account. You cannot use it again."
			};
		}

		if (activeEmeraldPass) {
			const userCanMakeReservation = await canMakeReservation($collectionInfo.contractName);
			if (!userCanMakeReservation) {
				return {
					error:	"Someone has already used this Collection Name. Please choose another."
				}
			}
		}
		
		return true;
	}

	// Activate next button when all required fields are filled
	$: buttonActive = $collectionInfo.name.length > 0 && $collectionInfo.payment && $collectionInfo.description.length > 0 && $collectionImage.files.length > 0;
</script>

<GeneratorStepLayout>
	<form use:form slot="main-content" id="collection-info">
		{#each collectionOptions as option}
			<Input
				header={option.header}
				name={option.name}
				type={option.type}
				store={option.store}
				errors={$errors}
				required={option.required}
				placeholder={option.placeholder}
				helperText={option.helperText} 
				/>
		{/each}
	</form>
	<Button
		slot="buttons"
		type="submit"
		form="collection-info"
		rightIcon="arrow-forward-circle"
		loading={$activeStep.loading}
		disabled={!buttonActive}
		>
		{#if $activeStep.loading}
      Checking Collection Availability
    {:else}
			Next
		{/if}
	</Button>
</GeneratorStepLayout>

<style type="scss">
	form {
		gap: 2.2rem;
	}
</style>
