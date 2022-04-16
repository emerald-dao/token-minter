<script>
	import LibLoader from "$lib/components/LibLoader.svelte";
	import { deployContract, logIn, unauthenticate } from "../flow/actions.js";
	import { contractCode, contractInfo, user } from "../flow/stores.js";
	import Transaction from "../lib/Transaction.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<LibLoader
	url="/prism.js"
	uniqueId={+new Date()}
/>

<div class="left-side">
	<button on:click={logIn}>Log In</button>
	<button on:click={unauthenticate}>Log Out</button>
	<h1>User: {$user?.addr}</h1>
	<input bind:value={$contractInfo.name} type="text" />
	<input bind:value={$contractInfo.maxSupply} type="number" min="1" placeholder="max number of nfts" />
	<input bind:value={$contractInfo.payment} type="number" min="1" placeholder="nft cost" />
	<button on:click={deployContract}>Deploy Contract</button>
</div>

<Transaction />

<pre><code class="language-javascript">{$contractCode}</code></pre> 

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
