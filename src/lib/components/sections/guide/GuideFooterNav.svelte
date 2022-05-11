<script>
  // Get chapter's previous and following chapter
  import { page } from '$app/stores';

  $: pathname = $page.url.pathname;
  $: relativePathname = pathname.replace('/guide', '');
  $: lang = `${relativePathname.match(/[^/]+?(?=\/|$)/) || ''}`; 

  export let previousChapterName
  export let previousChapterHref;
  export let nextChapterName;
  export let nextChapterHref;
</script>

<nav>
  <a href={previousChapterHref} class="card left-align">
    <div class="card-direction">{`< Previous`}</div>
    {previousChapterName}
  </a>
  <a href={nextChapterHref} class="card right-align">
    <div class="card-direction">{`Next >`}</div>
    {nextChapterName}
  </a>
</nav>

<style>
  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr));
    width: 100%;
    gap: 2em;
    margin-top: 6rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border: 1px solid var(--clr-primary-soft);
    border-radius: 1em;
    padding: 1em;
    width: 100%;
    font-family: var(--font-mono);
  }

  .card-direction {
    color: var(--clr-font-text)
  }

  .left-align {
    align-items: flex-start;
  }

  .right-align {
    align-items: flex-end;
  }
</style>