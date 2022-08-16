<script>
	import { Button, Stack } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { contractCode, contractInfo, user } from "../../../../flow/stores.js";
	import { createForm } from "felte";
	import contractOptions from "$lib/config/contractOptions.js";
	import verifierOptions from "$lib/config/verifierOptions.js";
	import GeneratorStepLayout from "./GeneratorStepLayout.svelte";
	import { onNext } from "$lib/stores/generator/updateFunctions.js";

	const { form } = createForm({
		onSubmit() {
			onNext();
		},
	});
</script>

<GeneratorStepLayout>
	<div slot="main-content" class="main-container">
		<div class="inputs-wrapper">
			<form use:form id="contract-info">
				<h4>Contract Options</h4>
				<span class="helper-text"
					>Select the options you want to include in your contract.</span>
				<div class="inputs">
					<!-- Generate input values from the contractOptions object -->
					{#each contractOptions as option}
						<label
							class="checkbox-label"
							class:checkbox-label-with-number={option.withNumber}
							for={option.bindValue}>
							<input
								name={option.bindValue}
								id={option.bindValue}
								type="checkbox"
								bind:checked={$contractInfo[option.bindValue]} />
							{option.name}
							{#if option.withNumber}
								<input
									name={option.bindValue + "Number"}
									id={option.bindValue + "Number"}
									type="number"
									disabled={$contractInfo[option.bindValue]
										? !$contractInfo[option.bindValue]
										: true}
									placeholder="Number"
									bind:value={$contractInfo[option.bindValue + "Number"]} />
							{/if}
						</label>
					{/each}
				</div>
				<h4>Minting Verifiers</h4>
				<span class="helper-text"
					>Requirements users must meet to mint your NFTs.</span>
				<div class="inputs">
					<!-- Generate input values from the verifierOptions object -->
					{#each verifierOptions as option}
						<label class="checkbox-label" for={option.bindValue}>
							<input
								name={option.bindValue}
								id={option.bindValue}
								type="checkbox"
								bind:checked={$contractInfo[option.bindValue]} />
							{option.name}
						</label>
						{#if option.withText}
							<input
								name={option.bindValue + "Text"}
								id={option.bindValue + "Text"}
								class="input-text"
								type="text"
								disabled={$contractInfo[option.bindValue]
									? !$contractInfo[option.bindValue]
									: true}
								placeholder="https://floats.city/jacob.find/event/185382914"
								bind:value={$contractInfo[option.bindValue + "Text"]} />
						{/if}
					{/each}
				</div>
			</form>
		</div>
		<div class="code">
			<PrismJS code={$contractCode} title={`${$contractInfo.name} Contract`} />
		</div>
	</div>
	<Stack slot="buttons" direction="row">
		<Button
			class="ghost"
			leftIcon="download"
			href={`data:text/plain;charset=utf-8, ${encodeURIComponent(
				$contractCode
			)}`}
			download={`${$contractInfo.name}.cdc`}>Download Code</Button>
		<Button type="submit" form="contract-info" rightIcon="arrow-forward-circle"
			>Next</Button>
	</Stack>
</GeneratorStepLayout>

<style type="scss">
	@use "../../../styles/abstracts" as *;

	.main-container {
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
		height: 100%;

		@include mq(medium) {
			display: grid;
			grid-template-columns: 0.6fr 1fr;
			grid-template-rows: auto auto;
			grid-template-areas:
				"inputs-wrapper code"
				"buttons buttons";
			column-gap: 3.4rem;
		}

		.inputs-wrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-right: 1rem;

			@include mq(medium) {
				grid-area: inputs-wrapper;
				overflow-x: auto;
			}

			h4 {
				margin-top: 20px;
				margin-bottom: 0.2rem;
				font-size: var(--fs-400);
				font-weight: 200;
			}
			.inputs {
				margin-top: 0.5rem;
				padding: 1.5rem;
				background-color: var(--clr-accent-main-t9);
				border-radius: 1rem;
				width: 100%;

				.input-text {
					margin-top: 10px;
					position: relative;
					font-size: 12px;
				}
			}
		}

		.code {
			@include mq(medium) {
				display: flex;
				height: 100%;
				overflow-y: auto;
				grid-area: code;
			}
			display: none;
		}
	}
</style>
