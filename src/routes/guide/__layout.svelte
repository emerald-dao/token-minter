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

    return {
      props: {
        chapters,
      },
    };
  };
</script>

<script>
  import GuideNav from "$lib/components/sections/guide/GuideNav.svelte";
  import TableOfContents from "$lib/components/sections/guide/TableOfContents.svelte";

  export let chapters
</script>

<div id="main-container">
  <nav>
    <GuideNav chapters={chapters}/>
  </nav>
  <div id="content">
    <article>
      <slot/>
    </article>
    <div id="table-of-contents">
      <TableOfContents/>
    </div>
  </div>
</div>

<style type="scss">
  #main-container {
    display: flex;
    flex-direction: row;
  }

  nav {
    top: 7.25rem;
    padding: 2rem 0px 4rem;
    height: calc(100vh - 80px);
    width: calc((100% - 1448px) / 2 + 298px);
    min-width: 298px;
    overflow-y: auto;
    position: sticky;
    width: 300px;
    background-color: pink;
  }
  
  article {
    background-color: green;
    width: 100%;
  }

  #content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
    width: 100%;
    height: 100%;
  }

  #table-of-contents {
    width: 200px;
  }
</style>