<script>
  import {
    Stack,
    WalletConnectModal,
    EditCollectionNav,
    HtmlHead,
  } from "$atoms";
  import { GeneratorStepLayout } from "$components/sections/generator/index";
  import SidebarMainLayout from "$components/layout/SidebarMainLayout.svelte";
  import { user } from "$stores/FlowStore";
  import { getCollectionInfo } from "$flow/actions";
  import TransactionModal from "$lib/components/atoms/TransactionModal.svelte";
  import { setContext } from "svelte";
  import { page } from "$app/stores";

  let userAddress = $user?.addr;

  setContext(
    "collectionInfo",
    getCollectionInfo($page.params.collection, userAddress),
  );
</script>

<HtmlHead title="My Collections" />
<TransactionModal />

{#if $user?.loggedIn}
  <SidebarMainLayout>
    <EditCollectionNav slot="sidebar" />
    <GeneratorStepLayout slot="main">
      <Stack direction="column" slot="main-content" align="flex-start">
        <slot />
      </Stack>
    </GeneratorStepLayout>
  </SidebarMainLayout>
{:else}
  <WalletConnectModal />
{/if}
