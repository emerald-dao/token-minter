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

  import { Section, Container, HtmlHead } from "$atoms";
  
  import GuideSidebarNav from "$components/sections/guide/GuideSidebarNav.svelte";
  import GuideFooterNav from "$components/sections/guide/GuideFooterNav.svelte";

  export let chapters
</script>

<HtmlHead title="Guide"/>

<Section class="padding-top-small padding-bottom-small">
  <Container class="width-large">
    <div class="main-wrapper">
      <nav>
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
      gap: 3rem;
      grid-template-columns: minmax(0,1fr) minmax(0,2.5fr) minmax(0,15rem);
      grid-template-rows: repeat(2, auto);
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
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      top: 5rem;
      max-height: 100vh;
      padding-bottom: 2em;
    }
  }
  
  .footer-nav {
    @include mq(medium) {
      grid-area: footer-nav;
    }
  }
</style>

  
 