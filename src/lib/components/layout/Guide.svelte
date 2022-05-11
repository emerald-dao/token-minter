<script>
  import GuideFooterNav from "../sections/guide/GuideFooterNav.svelte";
  import TableOfContents from "../sections/guide/TableOfContents.svelte";

  export let headings;
</script>

{#if headings.length > 1}
  <aside>
    <TableOfContents contentsArray={headings}/>
  </aside>
{/if}
<article>
  <slot/>
  <GuideFooterNav/>
</article>

<style type="scss">
  aside {
    grid-area: toc;
    align-self: start;
    overflow: auto;
    position: sticky;
    /* TODO: Add top offset variable */
    top: 12rem;
    max-height: 100vh;
  }
  
  article {
    grid-area: main;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
    padding: 0;
    max-width: 60ch;
    height: 100%;
  }
</style>