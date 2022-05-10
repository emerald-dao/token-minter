<script>
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
</article>

<style type="scss">
  aside {
    background-color: var(--clr-background-secondary);
    grid-area: toc;
    align-self: start;
    overflow: auto;
    position: sticky;
    /* TODO: Add top offset variable */
    top: 1rem;
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
    width: 100%;
    height: 100%;
  }
</style>