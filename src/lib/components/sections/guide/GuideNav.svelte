<script>
  // Make the link of the active chapter active
  import { page } from '$app/stores';

  $: pathname = $page.url.pathname;
  $: relativePathname = pathname.replace('/guide', '');
  $: lang = `${relativePathname.match(/[^/]+?(?=\/|$)/) || ''}`; 
  $: url = $page.url.pathname

  export let chapters;
</script>

<nav>
  <ul>
    {#each chapters as { slug, title, chapter }}
    <li>
      <a   
          class:current={url === `/guide/${lang}/${slug}`}
          href={slug}
        >
          {chapter}. {title}  
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  ul {
    list-style: none;
  }

  li {
    margin-bottom: 1.4em;
    font-family: var(--font-mono);
    font-size: var(--fs-300);
  }

  a {
    color: var(--clr-font-text-soft);
    text-decoration: none;
  }

  .current {
    color: var(--clr-primary-main);
  }
</style>