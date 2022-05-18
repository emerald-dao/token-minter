<script>
  // Get chapter's previous and following chapter
  import { page } from '$app/stores';

  $: pathname = $page.url.pathname;
  $: relativePathname = pathname.replace(/^(\/guide\/[^\/]+)\//, '');
  
  export let chapters

  $: currentChapter = chapters.find(chapter => chapter.slug === relativePathname);

  $: previousChapter = currentChapter.index > 1 ? chapters[currentChapter.index - 2] : null;
  $: nextChapter = currentChapter.index < chapters.length ? chapters[currentChapter.index] : null;
</script>

<nav>
  <div class="left-col">
    {#if previousChapter}
      <a href={previousChapter.slug} class="card">
        <div class="card-direction">{`< Previous`}</div>
        {previousChapter.title}
      </a>
    {/if}
  </div>
  <div class="right-col">
    {#if nextChapter}
      <a href={nextChapter.slug} class="card">
        <div class="card-direction">{`Next >`}</div>
        {nextChapter.title}
      </a>
    {/if}
  </div>
</nav>

<style type="scss">
  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr));
    grid-template-areas: "left right";
    width: 100%;
    gap: 2em;
    margin-top: 6rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border: 1px solid var(--clr-primary-soft);
    border-radius: 0.4em;
    padding: 1em;
    width: 100%;
    font-family: var(--font-mono);
    font-size: var(--fs-300);
    text-decoration: none;
  }

  .card:hover {
    box-shadow: var(--clr-primary-main) -5px 5px;
    transition: 0.4s;
  }

  .card-direction {
    color: var(--clr-font-text)
  }

  .left-col {
    grid-area: "left";
    
    .card {
      align-items: flex-start;
    }
  }

  .right-col {
    grid-area: "right";

    .card {
      align-items: flex-end;
    }
  }
</style>