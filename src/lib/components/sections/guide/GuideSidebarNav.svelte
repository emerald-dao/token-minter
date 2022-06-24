<script>
  import { Select, NavigationStep, TransparentCard } from '$lib/components/atoms/index'
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  // Make the link of the active chapter active
  $: pathname = $page.url.pathname;
  $: relativePathname = pathname.replace('/guide', '');
  $: lang = `${relativePathname.match(/[^/]+?(?=\/|$)/) || ''}`;
  
  let selectedChapter;

  const changeChapter = (path, i) => {
    selectedChapter = i;
    goto(path);
  }
  
  export let chapters;
</script>

<div class="main-wrapper">
  <TransparentCard accent={true} height="fit-content">
    <div class="desktop-nav">
      <ul>
        {#each chapters as { slug, title, index }}
            <NavigationStep 
              active={pathname === `/guide/${lang}/${slug}`} 
              clickable={true} 
              passed={selectedChapter > index}
              number={index}
              on:click={() => changeChapter(slug, index)}
            >
              {title}  
            </NavigationStep>
        {/each}
      </ul>
    </div>
    <div class="mobile-nav">
      <Select on:change="{({ target }) => goto(`/guide/${lang}/${target.value}`)}">
        {#each chapters as { slug, title, index }}
          <option value={slug} selected={$page.url.pathname.includes(slug)}>
            {index}. {title}  
          </option>
        {/each} 
      </Select>
    </div>
  </TransparentCard>
</div>


<style type="scss">
  @use "../../../styles/abstracts" as *;

  .main-wrapper {
    margin-bottom: 1rem;
    width: 100%;

    .desktop-nav {
      display: none;
  
      @include mq(medium) {
        display: block;
      }
      
      ul {
        padding: 0;
        margin: 0;
      }
    }
  
    .mobile-nav {
      @include mq(medium) {
        display: none;
      }
    }
  }
</style>