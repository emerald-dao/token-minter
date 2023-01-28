<script>
	import { getContext } from "svelte";
	import { Stack, CollectionStat, TransparentCard } from "$atoms";
	import { user } from "$stores/FlowStore";
	import { page } from "$app/stores";
	import {
		getEmeraldIDBatch,
		getVersion,
		proposeNFTToCatalog,
		toggleMinting,
	} from "$flow/actions";
	import Button from "$lib/components/atoms/Button.svelte";

	const collectionInfo = getContext("collectionInfo");
	const hasEmeraldPass = getContext("emeraldPass");

	const saveContent = (fileContents, fileName) => {
		const link = document.createElement("a");
		link.download = fileName;
		link.href = fileContents;
		link.click();
	};

	const downloadBuyers = async (primaryBuyers, collectionName) => {
		const version = await getVersion(collectionName, $user.addr);
		if (version == 0) {
			let csvContent = `data:text/csv;charset=utf-8,nft metadataId,buyer address,discord name\n`;
			const emeraldIds = await getEmeraldIDBatch(Object.values(primaryBuyers));
			for (const metadataId in primaryBuyers) {
				const buyer = primaryBuyers[metadataId];
				csvContent +=
					metadataId +
					"," +
					buyer +
					"," +
					(emeraldIds[buyer] ?? "NOT FOUND") +
					"\n";
			}
			saveContent(csvContent, `${collectionName}-buyers.csv`);
		} else if (version == 1) {
			let csvContent = `data:text/csv;charset=utf-8,buyer address,discord name,metadata id,amount purchased\n`;
			const emeraldIds = await getEmeraldIDBatch(Object.keys(primaryBuyers));
			console.log(primaryBuyers);
			for (const buyer in primaryBuyers) {
				const metadataIdPurchases = primaryBuyers[buyer];
				for (const metadataId in metadataIdPurchases) {
					csvContent +=
						buyer +
						"," +
						(emeraldIds[buyer] ?? "NOT FOUND") +
						"," +
						metadataId +
						"," +
						metadataIdPurchases[metadataId].length +
						"\n";
				}
			}
			saveContent(csvContent, `${collectionName}-buyers.csv`);
		}
	};
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
			<CollectionStat title="NFTs Minted" stat="0" />
		{:then info}
			<CollectionStat
				title="NFTs Minted"
				stat={Object.keys(info.primaryBuyers).length} />
		{/await}
	</TransparentCard>
	<TransparentCard accent={true}>
		{#await collectionInfo}
			<CollectionStat title="Profit" stat="0" flowLogo={true} />
		{:then info}
			<CollectionStat
				title="Profit"
				stat={Number(info.profit)}
				flowLogo={info.paymentType === "$FLOW"}
				fusdLogo={info.paymentType === "$FUSD"} />
		{/await}
	</TransparentCard>
</div>
<div style="width: 100%;">
	<Stack direction="column" align="flex-start" gap="1.4rem">
		{#await collectionInfo then info}
			<TransparentCard border={true}>
				<Stack direction="column">
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
			{#await hasEmeraldPass then pass}
				<Button
					locked={!pass}
					on:click={() =>
						downloadBuyers(info.primaryBuyers, $page.params.collection)}
					>Download Buyers</Button>
				<Button
					locked={false}
					on:click={() =>
						proposeNFTToCatalog($page.params.collection, $user.addr)}
					>Add to NFT Catalog</Button>
				<Button
					locked={false}
					on:click={() =>
						navigator.clipboard.writeText(
							`/verify touchstone contractaddress:${$user.addr} contractname:${$page.params.collection} amount: role:`
						)}>Copy Discord Verification</Button>
			{/await}
		{/await}
	</Stack>
</div>

<style type="scss">
	@use "../../../../../lib/styles/abstracts" as *;

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
