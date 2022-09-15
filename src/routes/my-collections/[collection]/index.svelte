<script>
	import { getContext } from 'svelte';
  import { Stack, CollectionStat, TransparentCard } from "$atoms";

	const collectionInfo = getContext('collectionInfo');
</script>


<div class="stats-wrapper">
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="Total Items" stat="0"/>
		{:then info} 
			<CollectionStat title="Total Items" stat={info.totalSupply}/>
		{/await}
	</TransparentCard>
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="NFTs Sold" stat="0"/>
		{:then info} 
			<CollectionStat title="NFTs Sold" stat={info.totalSupply}/>
		{/await}
	</TransparentCard>
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="Profit" stat="0" flowLogo={true}/>
		{:then info} 
			<CollectionStat title="Profit" stat={Number(info.profit).toFixed(2)} flowLogo={true}/>
		{/await}
	</TransparentCard>
</div>
<div style="width: 100%;">
	<Stack direction="column" gap="1.4rem">
		<TransparentCard border={true}>
			<Stack direction="row">
				<label for="sale-active" class="checkbox-label">
					<input id="sale-active" name="sale-active" type="checkbox">
					Sale Active
				</label>
			</Stack>
		</TransparentCard>
		<TransparentCard border={true}>
			<Stack direction="row">
				<label for="other-option" class="checkbox-label">
					<input id="other-option" name="other-option" type="checkbox">
					Other option
				</label>
			</Stack>
		</TransparentCard>
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