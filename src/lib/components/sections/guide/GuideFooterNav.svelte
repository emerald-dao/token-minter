<script>
  // Get chapter's previous and following chapter
  import { page } from "$app/stores";
  export let chapters;

  $: relativePathname = $page.url.pathname.replace(/^(\/guide\/[^\/]+)\//, "");
  $: currentChapter = chapters.find(
    (chapter) => chapter.slug === relativePathname
  );
  $: previousChapter =
    currentChapter.index > 1 ? chapters[currentChapter.index - 2] : null;
  $: nextChapter =
    currentChapter.index < chapters.length
      ? chapters[currentChapter.index]
      : null;
</script>

<nav>
  {#if previousChapter}
    <div class="left">
      <a href={previousChapter.slug} class="card">
        <div class="card-direction">{`< Previous`}</div>
        {previousChapter.title}
      </a>
    </div>
  {/if}
  {#if nextChapter}
    <div class="right">
      <a href={nextChapter.slug} class="card">
        <div class="card-direction">{`Next >`}</div>
        {nextChapter.title}
      </a>
    </div>
  {/if}
</nav>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2em;
    margin-top: 6rem;

    @include mq(small) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
      grid-template-areas: "left right";
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border: 2px solid var(--clr-accent-main-t7);
    border-radius: 0.4em;
    background-color: var(--clr-accent-main-t9);
    padding: 1em;
    width: 100%;
    font-family: var(--font-mono);
    font-size: var(--fs-300);
    text-decoration: none;
    align-items: flex-start;
    color: var(--clr-accent-main);
  }

  .card:hover {
    box-shadow: var(--clr-accent-main) -5px 5px;
    transition: 0.4s;
  }

  .card-direction {
    color: var(--clr-font-text);
  }

  .left {
    @include mq(small) {
      grid-area: left;
    }
    
    .card {
      justify-content: flex-start;
    }
  }
  .right {
    @include mq(small) {
      grid-area: right;
    }
    .card {
      align-items: flex-end;
    }
  }
</style>
