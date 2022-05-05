<script>
  import { page } from '$app/stores';

  $: url = $page.path
  
  export let chapters;

  const transformHref = (ref) => {
    const newRef = (ref === "./index.md") ? "/guide" :
    ref
      .replace("./", "/guide/")
      .replace(".md", "")
      .replace(".svx", "")
    return newRef;
  }
</script>

<nav>
  <ul>
    {#each chapters as { path, metadata: { title, chapter } }}
      <li>
        <a   
          class:current={url === transformHref(path)}
          href={transformHref(path)}
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