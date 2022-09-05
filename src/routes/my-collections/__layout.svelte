<script>
	import { 
    WalletConnectModal,
    MyCollectionsNav,
    HtmlHead,
    Stack
	} from "$atoms";
  import { GeneratorStepLayout } from '$components/sections/generator/index'
  import SidebarMainLayout from "$components/layout/SidebarMainLayout.svelte";
  import { user } from '$stores/FlowStore'
</script>

<HtmlHead title="My Collections"/>

{#if $user?.loggedIn}
  <SidebarMainLayout>
    <MyCollectionsNav slot="sidebar"/>
    <GeneratorStepLayout slot="main">
      <Stack direction="column" slot="main-content">
        <slot/>
      </Stack>
    </GeneratorStepLayout>
  </SidebarMainLayout>
{:else}
  <WalletConnectModal/>
{/if}