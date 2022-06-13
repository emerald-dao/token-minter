<script>
	import { StepsButtons } from "$lib/components/atoms/index";
	import PrismJS from "$lib/components/prism/PrismJS.svelte";
	import { contractCode, contractInfo, user } from "../../../../flow/stores.js";
	import { createForm } from 'felte';
	import contractOptions from '$lib/config/contractOptions.js'

	export let onSubmitText;
  export let onSubmitAction;

  const { form } = createForm({
		onSubmit() {
      onSubmitAction();
    },
	});
</script>

<form use:form>
	<div class="inputs-wrapper">
		<h4>Contract Options</h4>
		<span class="helper-text">Select the options you want to include in your contract.</span>
		<div class="inputs">
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
		</div>
	</div>
	
	<div class="code">
		<PrismJS code={$contractCode} title={`${$contractInfo.name} Contract`}/>
	</div>
	<div class="buttons">
		<StepsButtons onSubmitText={onSubmitText}/>
	</div>
</form>

<style type="scss">
	@use "../../../styles/abstracts" as *;

	form {
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
			gap: 3rem;
		}
		
		.inputs-wrapper {
			display: flex;
			flex-direction: column;
			width: 100%;

			@include mq(medium) {
				grid-area: inputs-wrapper;
				height: 100%;
				overflow-x: auto;
			}

			h4 {
				margin-bottom: 0.2rem;
				font-size: var(--fs-400);
				font-weight: 200;
			}
			.inputs {
				margin-top: 0.5rem;
				padding: 1.5rem;
				border: 1px var(--clr-primary-main) solid;
				border-radius: 1rem;
			}
		}

		.code {
			@include mq(medium) {
				display: flex;
				max-height: 60vh;
				overflow-y: auto;
				grid-area: code;
			}
			display: none;
		}

		.buttons {
			display: flex;
			width: 100%;
			justify-content: flex-end;
			
			@include mq(medium) {
				grid-area: buttons;
			}
		}
	}
</style>