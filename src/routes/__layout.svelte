<script>
  import Header from "$lib/header/Header.svelte";
</script>

<!-- <Header /> -->

<main class="container">
  <slot />
</main>

<style type="text/scss">	
	main {
    background-color: var(--cr-background-primary);
  }
</style>