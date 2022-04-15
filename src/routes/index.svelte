<script>
	import LibLoader from "$lib/components/LibLoader.svelte";
	import { contractCode, contractInfo } from "../flow/stores.js";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<LibLoader
	url="/prism.js"
	uniqueId={+new Date()}
/>

<div class="left-side">
	<input bind:value={$contractInfo.name} type="text" />
</div>

<pre class="right-side"><code class="language-javascript">{contractCode}</code></pre> 

<style>
	.right-side {
		position: absolute;
		width: 50vw;
		height: 50vh;
		left: 48vw;
		top: 10px;
		overflow-y: scroll;
		border-radius: 20px;
		font-size: 10px;
	}
</style>
