<script>
  import { Select } from '$lib/components/atoms/index'
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  // Make the link of the active chapter active
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
<div class="mobile-nav">
  <Select on:change="{({ target }) => goto(`/guide/${lang}/${target.value}`)}">
   {#each chapters as { slug, title, index }}
      <option value={slug} selected={$page.url.pathname.includes(slug)}>
        {index}. {title}  
      </option>
    {/each} 
  </Select>
</div>


<style type="scss">
  @use "../../../styles/abstracts" as *;

  ul {
    display: none;
    
    @include mq(medium) {
      // TODO: Apply dynamic colors
      background-color: hsla(234, 67%, 40%, 0.2);
      padding: 1.5em;
      border-radius: 0.6em;
      display: flex;
      font-family: var(--font-mono);
      font-size: var(--fs-200);
      list-style: none;
      flex-direction: column;
      gap: 2em;
    }
  }

  a {
    color: var(--clr-font-text-soft);
    text-decoration: none;
  }

  .current {
    color: var(--clr-primary-main);
  }

  .mobile-nav {
    margin-bottom: 4rem;

    @include mq(medium) {
      display: none;
    }
  }
</style>