<script>
	import { 
    Stack,
    CollectionCard,
    WalletConnectModal,
    CreateCollectionCard,
    EditCollectionNav
	} from "$lib/components/atoms/index";
  import { GeneratorStepLayout } from '$lib/components/sections/generator/index'
  import SidebarMainLayout from "$lib/components/layout/SidebarMainLayout.svelte";
  import { user } from '../../../flow/stores'
</script>


{#if $user?.loggedIn}
  <SidebarMainLayout>
    <EditCollectionNav slot="sidebar" collectionName="Awesome Collection"/>
    <GeneratorStepLayout slot="main">
      <Stack direction="column" slot="main-content">
        <CreateCollectionCard/>
      </Stack>
    </GeneratorStepLayout>
  </SidebarMainLayout>
{:else}
  <WalletConnectModal/>
{/if}