<script>
	import { 
    Stack,
    WalletConnectModal,
    CreateCollectionCard,
    EditCollectionNav,
    HtmlHead
	} from "$atoms";
  import { GeneratorStepLayout } from '$components/sections/generator/index'
  import SidebarMainLayout from "$components/layout/SidebarMainLayout.svelte";
  import { user } from '$stores/FlowStore'
</script>

<HtmlHead title="My Collections"/>

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