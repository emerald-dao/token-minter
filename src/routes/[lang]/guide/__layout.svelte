<script context="module">
  import { loadTranslations } from '$lib/guide/translations';

  // Get translations + get list of chapters to make navigation menu 
  export const load = async ({ fetch, params, url }) => {
    try {
      const { pathname } = url;
      const lang = `${pathname.match(/[^/]+?(?=\/|$)/) || ''}`;

      const route = pathname.replace(new RegExp(`^/${lang}`), '');

      await loadTranslations(lang, route);
      
      const res = await fetch(`/api/guide/${params.lang}.json`)
      let { chapters } = await res.json()

      return {
        props: { 
          chapters: chapters
        },
        stuff: { 
          route, 
          lang 
        }
      }
    } catch(error) {
      return {
        status: 404,
        error: error.message
      }
    }
  }
</script>

<script>
  import { t, locales, locale } from '$lib/guide/translations';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import '$lib/styles/guide/guide.scss';
  import GuideNav from "$lib/components/sections/guide/GuideNav.svelte";

  export let chapters
</script>



<div class="main-wrapper">
  <nav>
    <select on:change="{({ target }) => goto(`${target.value}/guide/index`)}">
      {#each $locales as lc}
        <option value="/{lc}" selected="{lc === $locale}">{$t(`lang.${lc}`)}</option>
      {/each}
    </select>
   <GuideNav chapters={chapters}/>
  </nav>
   <slot/>
</div>

<style type="scss">
  .main-wrapper {
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,2.5fr) minmax(0,15rem);
    gap: 3rem;
    grid-template-areas: "sidebar main toc";
    padding-left: 1rem;
    padding-right: 1rem;
  }

  nav {
    grid-area: sidebar;
    align-self: start;
    overflow: auto;
    position: sticky;
    // TODO: Add top offset variable
    top: 1rem;
    max-height: 100vh;
    background-color: var(--clr-background-secondary);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
</style>