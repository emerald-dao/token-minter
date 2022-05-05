<script context="module">
  export const load = async ({ page }) => {
    try {  
      const chapter = await import(`../../../lib/guide/translations/${page.params.lang}/${page.params.chapter}.md`)

      return {
        props: {
          PostContent: chapter.default,
          meta: { ...chapter.metadata, slug: page.path } 
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
  export let PostContent
  export let meta

  const { title, author, chapter } = meta
</script>

<svelte:component this={PostContent} />
