<script>
  import Navigation from '$lib/components/modules/Navigation.svelte';
  import { Container, Logo } from "$lib/components/atoms/index.js";

  import { page } from '$app/stores';
</script>

{#if !$page.url.pathname.includes("collection-generator") }             
  <footer>
    <Container class="width-large">
      <nav>
        <Logo/>
        <Navigation/>
    </Container>
  </footer>
{/if}

<style type="scss">
  footer {
    padding: 0;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--primary);
  }

  @media (max-width: 20em) {
    nav {
      flex-direction: column;
      gap: 1em;
    }
  }
</style>