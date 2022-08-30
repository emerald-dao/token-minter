<script>
	import { 
    Stack,
    CollectionCard,
    WalletConnectModal,
    CreateCollectionCard,
    MyCollectionsNav
	} from "$atoms";
  import { GeneratorStepLayout } from '$components/sections/generator/index'
  import SidebarMainLayout from "$components/layout/SidebarMainLayout.svelte";
  import { getContractDisplays } from "$flow/actions";
  import { user } from '$stores/FlowStore'
</script>


{#if $user?.loggedIn}
  <SidebarMainLayout>
    <MyCollectionsNav slot="sidebar"/>
    <GeneratorStepLayout slot="main">
      <Stack direction="column" slot="main-content">
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
        </Stack>
    </GeneratorStepLayout>
  </SidebarMainLayout>
{:else}
  <WalletConnectModal/>
{/if}