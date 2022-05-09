<!-- <script context="module">
  export const load = async ({ params, url }) => {
    try {  
      const chapter = await import(`../../../lib/guide/translations/${params.lang}/${params.chapter}.md`)
      return {
        props: {
          PostContent: chapter.default,
          meta: { ...chapter.metadata, slug: url.pathname } 
        }
      }
    } catch(error) {
      return {
        status: 404,
        error: error.message
      }
    }
  }
</script> -->

<script>
  import '$lib/styles/guide/guide.scss'
  // import GuideNav from "$lib/components/sections/guide/GuideNav.svelte";

  // export let chapters
  export let chapterContent
</script>

<div class="main-wrapper">
   <nav>
     <!-- <GuideNav chapters={chapters}/> -->
   </nav>
  <svelte:component this={chapterContent}/>
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