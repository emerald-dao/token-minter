<script>
  import Header from "$components/layout/Header.svelte";
  import Footer from "$components/layout/Footer.svelte";
  import "$lib/styles/app.scss";
  import { page } from "$app/stores";

  const noFooterUrls = ["contract-generator", "my-collections"];
  $: hasFooter = !noFooterUrls.some((v) => $page.url.pathname.includes(v));
</script>

<Header />
<main>
  <slot />
</main>
{#if hasFooter}
  <Footer />
{/if}
