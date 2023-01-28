<script>
	import { 
    CollectionCard,
    CreateCollectionCard,
	} from "$atoms";
  import { getContractDisplays } from "$flow/actions";
  import { user } from '$stores/FlowStore'

  export let data;
  console.log(data);
</script>

{#each data.contractDisplays as collection}
  <CollectionCard
    name={collection.name}
    url={`/my-collections/${collection.contractName}`}
    thumbnailURL={`https://nftstorage.link/ipfs/${collection.image.cid}/${collection.image.path}`}
    description={collection.description}
    owner={$user.addr} />
{/each}
<CreateCollectionCard/>
