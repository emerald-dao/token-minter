<script>
  import BackgroundGradient from "$lib/components/atoms/BackgroundGradient.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import '$lib/styles/app.scss'
</script>

<Header/>
<BackgroundGradient/>
<main>
  <slot />
</main>
