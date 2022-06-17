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
  @use "../../styles/abstracts" as *;

  aside {
    @include mq(medium) {
      grid-area: toc;
      align-self: start;
      position: sticky;
      /* TODO: Add top offset variable */
      top: 6rem;
      max-height: 80vh;
    }
  }
  
  article {
    grid-area: main;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0;
    max-width: 60ch;
  }
</style>