<script>
	import { getContext } from "svelte";
	import { Stack, CollectionStat, TransparentCard } from "$atoms";
	import { user } from "$stores/FlowStore";
	import { page } from "$app/stores";
	import { toggleMinting } from "$flow/actions";

	const collectionInfo = getContext("collectionInfo");
</script>

<div class="stats-wrapper">
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="Total Items" stat="0" />
		{:then info}
			<CollectionStat
				title="Total Items"
				stat={Object.keys(info.metadatas).length} />
		{/await}
	</TransparentCard>
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="NFTs Sold" stat="0" />
		{:then info}
			<CollectionStat
				title="NFTs Sold"
				stat={Object.keys(info.primaryBuyers).length} />
		{/await}
	</TransparentCard>
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="Profit" stat="0" flowLogo={true} />
		{:then info}
			<CollectionStat
				title="Profit"
				stat={Number(info.profit).toFixed(2)}
				flowLogo={true} />
		{/await}
	</TransparentCard>
</div>
<div style="width: 100%;">
	<Stack direction="column" gap="1.4rem">
		{#await collectionInfo then info}
			<TransparentCard border={true}>
				<Stack direction="row">
					<label for="sale-active" class="checkbox-label">
						<input
							id="sale-active"
							name="sale-active"
							type="checkbox"
							checked={info.minting}
							on:click={() =>
								toggleMinting($page.params.collection, $user.addr)} />
						Sale Active
					</label>
				</Stack>
			</TransparentCard>
		{/await}
	</Stack>
</div>

<style type="scss">
	@use "../../../lib/styles/abstracts" as *;

	.stats-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
		width: 100%;

		@include mq(small) {
			flex-direction: row;
		}
	}

	label {
		width: 100%;
		font-size: var(--fs-300);
	}
</style>
