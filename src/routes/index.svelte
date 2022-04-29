<script>
	import LibLoader from "$lib/components/LibLoader.svelte";
	import { deployContract, logIn, unauthenticate } from "../flow/actions.js";
	import { contractCode, contractInfo, user } from "../flow/stores.js";
	import Transaction from "$lib/Transaction.svelte";
	import PrismJS from "$lib/components/PrismJS.svelte";
	import { Button, Section, Container } from "$lib/components/atoms/index.js";

	function addParameter(name, type) {
		if (name && !$contractInfo.parameters.includes(name)) {
			$contractInfo.parameters.push(name);
			$contractInfo.parameterFields += "\n			pub let " + name + ": " + type;
			$contractInfo.parameterInits += "\n				" + name + ": " + type + ",";
			$contractInfo.parameterSets += "\n				self." + name + " = " + name;
			$contractInfo.parameterMatches += "\n				" + name + ": " + name;
		}
	}

	let fieldName;
	let fieldType;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Section>
	<Container>
		<Button on:click={logIn}>Log In</Button>
		<Button on:click={unauthenticate}>Log Out</Button>
		<h1>User: {$user?.addr}</h1>

		<label for="contract-name">Contract Name</label>
		<input
			id="contract-name"
			bind:value={$contractInfo.name}
			type="text"
			placeholder="ExampleNFT"
		/>

		<label for="max-supply">Max Supply</label>
		<input
			bind:value={$contractInfo.maxSupply}
			type="number"
			min="1"
			placeholder="100"
			id="max-supply"
		/>

		<label for="price">Price</label>
		<input
			bind:value={$contractInfo.payment}
			type="number"
			min="1"
			placeholder="10"
			id="price"
		/>
		<Button
			on:click={() => ($contractInfo.openMinting = !$contractInfo.openMinting)}
		>
			Open Minting: {$contractInfo.openMinting}
		</Button>
		<Button
			on:click={() => ($contractInfo.startMinting = !$contractInfo.startMinting)}
		>
			Start Minting: {$contractInfo.startMinting}
		</Button>
		<Button
			on:click={() => ($contractInfo.manualMint = !$contractInfo.manualMint)}
		>
			Manual Minting: {$contractInfo.manualMint}
		</Button>
		<Button on:click={() => addParameter(fieldName, fieldType)}>
			Add Parameter
		</Button>
		<div class="grid">
			<input bind:value={fieldName} type="text" />
			<select bind:value={fieldType} name="types" id="types">
				<option value="String">String</option>
				<option value="UInt64">UInt64</option>
				<option value="Bool">Bool</option>
				<option value="Int">Int</option>
			</select>
		</div>
		<Button on:click={deployContract}>Deploy Contract</Button>
	</Container>
</Section>

<Transaction />

{#if $user?.loggedIn}
	<PrismJS code={$contractCode} />
{/if}

<style type="scss">	
</style>
