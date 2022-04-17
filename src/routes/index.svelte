<script>
	import LibLoader from "$lib/components/LibLoader.svelte";
	import { deployContract, logIn, unauthenticate } from "../flow/actions.js";
	import { contractCode, contractInfo, user } from "../flow/stores.js";
	import Transaction from "$lib/Transaction.svelte";
	import PrismJS from "$lib/components/PrismJS.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="left-side">
	<button on:click={logIn}>Log In</button>
	<button on:click={unauthenticate}>Log Out</button>
	<h1>User: {$user?.addr}</h1>
	<label for="contract-name">Contract Name</label>
	<input id="contract-name" bind:value={$contractInfo.name} type="text" placeholder="ExampleNFT" />

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
	<button
		class="secondary"
		on:click={() => ($contractInfo.openMinting = !$contractInfo.openMinting)}
		>Open Minting: {$contractInfo.openMinting}</button
	>
	<button
		class="secondary"
		on:click={() => ($contractInfo.startMinting = !$contractInfo.startMinting)}
		>Start Minting: {$contractInfo.startMinting}</button
	>
	<button on:click={deployContract}>Deploy Contract</button>
</div>

<Transaction />

{#if $user?.loggedIn}
	<PrismJS code={$contractCode} />
{/if}

<style>
	/* .right-side {
		position: absolute;
		width: 50vw;
		height: 50vh;
		left: 48vw;
		top: 10px;
		overflow-y: scroll;
		border-radius: 20px;
		font-size: 10px;
	} */
</style>
