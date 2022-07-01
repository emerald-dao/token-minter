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
      </nav>
    </Container>
  </footer>
{/if}

<style type="scss">
  @use "../../styles/abstracts" as *;

  footer {
    padding: 0;
    background-color: var(--clr-background-primary-t9);
  }

  nav {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    
    @include mq(medium) {
      padding-bottom: 10px;
      flex-direction: row;
    }
  }
</style>