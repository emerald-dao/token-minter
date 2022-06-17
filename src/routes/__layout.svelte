<script>
  import BackgroundGradient from "$lib/components/atoms/BackgroundGradient.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import '$lib/styles/app.scss'
</script>

<Header/>
<BackgroundGradient/>
<main>
  <slot />
</main>
<Footer/>
