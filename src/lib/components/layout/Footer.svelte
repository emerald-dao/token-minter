<script>
  import { Container} from "$lib/components/atoms/index.js";
  import Navigation from '$lib/components/modules/Navigation.svelte';
</script>

<header>
  <Container class="width-large">
    <nav>
      <div>Logo</div>
      <Navigation/>
  </Container>
</header>

<style type="scss">
  header {
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