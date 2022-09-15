<script>
	import { 
    Stack,
    WalletConnectModal,
    EditCollectionNav,
    HtmlHead
	} from "$atoms";
  import { GeneratorStepLayout } from '$components/sections/generator/index'
  import SidebarMainLayout from "$components/layout/SidebarMainLayout.svelte";
  import { user } from '$stores/FlowStore'
  import { checkRequiredVerifiers, getCollectionInfo } from "$flow/actions";
  import TransactionModal from "$lib/components/atoms/TransactionModal.svelte";
  import { getContext, setContext } from 'svelte';
  import { get, writable } from 'svelte/store';
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { resolveAddressObject } from "$flow/utils";

  let userAddress = $user?.addr;
  
  setContext('collectionInfo', getCollectionInfo($page.params.collection, userAddress))
</script>

<HtmlHead title="My Collections"/>
<TransactionModal/>

{#if $user?.loggedIn}
  <SidebarMainLayout>
    <EditCollectionNav slot="sidebar"/>
    <GeneratorStepLayout slot="main">
      <Stack direction="column" slot="main-content" align="flex-start">
        <slot/>
      </Stack>
    </GeneratorStepLayout>
  </SidebarMainLayout>
{:else}
  <WalletConnectModal/>
{/if}
