<!-- Get list of chapters to make navigation menu -->
<script context="module">
  const allChapters = import.meta.glob("./*.md");
  
  let body = [];
  
  for (let path in allChapters) {
    body.push(
      allChapters[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    );
  }
  
  export const load = async () => {
    const chapters = await Promise.all(body);
    
    chapters.sort((a, b) => {
      return a.metadata.chapter - b.metadata.chapter;
    });
    
    return {
      props: {
        chapters,
      },
    };
  };
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