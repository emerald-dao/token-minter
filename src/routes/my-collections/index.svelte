<script>
	import { 
    CollectionCard,
    CreateCollectionCard,
	} from "$atoms";
  import { getContractDisplays } from "$flow/actions";
  import { user } from '$stores/FlowStore'
</script>

{#await getContractDisplays($user.addr) then collections}
  {#each collections as collection}
    <CollectionCard
      name={collection.name}
      url={`/${$user.addr}/${collection.contractName}`}
      thumbnailURL={`https://nftstorage.link/ipfs/${collection.image.cid}/${collection.image.path}`}
      description={collection.description}
      owner={$user.addr} />
  {/each}
{/await}
<CreateCollectionCard/>