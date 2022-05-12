<script>
  // Make the link of the active chapter active
  import { page } from '$app/stores';
  
  $: pathname = $page.url.pathname;
  $: relativePathname = pathname.replace('/guide', '');
  $: lang = `${relativePathname.match(/[^/]+?(?=\/|$)/) || ''}`;

  export let chapters;
</script>

<ul>
  {#each chapters as { slug, title, index }}
  <li>
    <a   
        class:current={pathname === `/guide/${lang}/${slug}`}
        href={slug}
      >
        {index}. {title}  
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    font-family: var(--font-mono);
    font-size: var(--fs-200);
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  a {
    color: var(--clr-font-text-soft);
    text-decoration: none;
  }

  .current {
    color: var(--clr-primary-main);
  }
</style>