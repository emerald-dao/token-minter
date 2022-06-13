<script>
  import { Select, NavigationStep } from '$lib/components/atoms/index'
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
      <NavigationStep 
        active={pathname === `/guide/${lang}/${slug}`} 
        clickable={true} 
        passed={true}
        number={index}
        on:click={() => goto(slug)}
      >
        {title}  
      </NavigationStep>
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
  
  .mobile-nav {
    margin-bottom: 4rem;

    @include mq(medium) {
      display: none;
    }
  }
</style>