<script context="module">
  export const load = async ({ params }) => {
    try {
      const chapter = await import(`../../../lib/guide/translations/${params.lang}/${params.chapter}.md`)
      return {
        props: {
          chapterContent: chapter.default,        
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
  export let chapterContent
</script>

<svelte:component this={chapterContent}/>