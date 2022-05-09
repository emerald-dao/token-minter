<!-- Get list of chapters to make navigation menu -->
<script context="module">
  export const load = async ({ fetch, params }) => {
    try {
      const res = await fetch(`/api/guide/${params.lang}.json`)
      let { chapters } = await res.json()

      return {
        props: { 
          chapters: chapters
        }
      }
    } catch(error) {
      return {
        status: 404,
        error: error.message
      }
    }
  }
</script>

<script>
  import '$lib/styles/guide/guide.scss'
  import GuideNav from "$lib/components/sections/guide/GuideNav.svelte";

  export let chapters
</script>



<div class="main-wrapper">
  <nav>
   <GuideNav chapters={chapters}/>
  </nav>
   <slot/>
</div>

<style type="scss">
  .main-wrapper {
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,2.5fr) minmax(0,15rem);
    gap: 3rem;
    grid-template-areas: "sidebar main toc";
    padding-left: 1rem;
    padding-right: 1rem;
  }

  nav {
    grid-area: sidebar;
    align-self: start;
    overflow: auto;
    position: sticky;
    // TODO: Add top offset variable
    top: 1rem;
    max-height: 100vh;
    background-color: var(--clr-background-secondary);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
</style>