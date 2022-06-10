<script context="module">
  import { loadTranslations } from '$lib/guide/translations';

  // Get translations + get list of chapters to make navigation menu 
  export const load = async ({ fetch, params, url }) => {
    try {
      const { pathname } = url;
      const relativePathname = pathname.replace('/guide', '');
      const lang = `${relativePathname.match(/[^/]+?(?=\/|$)/) || ''}`;

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
  import '$lib/styles/base/guide.scss';

  import { Section, Container, Select } from "$lib/components/atoms/index";
  import { t, locales, locale } from '$lib/guide/translations';
  import { goto } from '$app/navigation';
  
  import GuideSidebarNav from "$lib/components/sections/guide/GuideSidebarNav.svelte";
  import GuideFooterNav from "$lib/components/sections/guide/GuideFooterNav.svelte";

  export let chapters
</script>

<Section class="padding-top-small padding-bottom-none">
  <Container class="width-large">
    <div class="main-wrapper">
      <nav>
        <Select on:change="{({ target }) => goto(`/guide${target.value}/welcome`)}">
          {#each $locales as lc}
            <option value="/{lc}" selected="{lc === $locale}">{$t(`lang.${lc}.flag`)}</option>
          {/each}
        </Select>
        <GuideSidebarNav chapters={chapters}/>
      </nav>
      <slot/>
      <div class="footer-nav">
        <GuideFooterNav chapters={chapters}/>
      </div>
    </div>
  </Container>
</Section>

<style type="scss">
  @use "../../../lib/styles/abstracts" as *;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    
    @include mq(medium) {
      display: grid;
      grid-template-columns: minmax(0,1fr) minmax(0,2.5fr) minmax(0,15rem);
      grid-template-rows: repeat(2, auto);
      gap: 3rem;
      grid-template-areas: "sidebar main toc" 
                            ". footer-nav .";
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  nav {
    @include mq(medium) {
      grid-area: sidebar;
      align-self: start;
      overflow: auto;
      position: sticky;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      // TODO: Add top offset variable
      top: 4rem;
      max-height: 100vh;
      border-right: 0.5px solid var(--clr-font-text-soft);
      padding-bottom: 2em;
    }
  }
  
  .footer-nav {
    @include mq(medium) {
      grid-area: footer-nav;
    }
  }
</style>

  
 