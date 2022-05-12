<script>  
  import { t } from '$lib/guide/translations'; 
	import { onMount, tick } from 'svelte'

	let elements = []
	function grabElements() {
		elements = []
    if(toc.length > 0) {
      toc.forEach((tocElement) => {
        const el = document.getElementById(`${tocElement.path}`)
        if (el) {
          elements = [...elements, el]
        }
      })
      trackScroll()
    }
	}

	onMount(() => {
    getToc()
		grabElements()
	})

	$: active = 0
	let disableTracker = false
	async function trackScroll() {
		await tick()
		if (!disableTracker) {
			elements.forEach(async (element, i) => {
				const { top, width } = element.getBoundingClientRect()
				if (width === 0) grabElements() // fixes weird bug where rects are all 0
				if (top < 300) {
					active = i
				}
			})
		}
	}

  // The TOC data is all given as metadata from custom made rehype plugin.
  export let contentsArray;

  const getToc = () => {
    contentsArray.forEach((content) => {
      if (content.level === 2) {
        toc = [...toc,
          {
            title: content.title,
            path: content.title.replace(/ /g,"-").toLowerCase()
          }
        ]
      }
    })
  }

  let toc = []
</script>

<svelte:window on:scroll={trackScroll} />

<section>
  <h2>{$t('toc.tocTitle')}</h2>
  <ul>
    {#each toc as tocElement, i}
      <li class:active={active === i}>
        <div class="link-wrapper">
          <a
            href={'#' + tocElement.path}
          >
            {tocElement.title}
          </a>
        </div>
      </li>
    {/each}
  </ul>
</section>

<style type="scss">
  section {
    display: flex;
    flex-direction: column;
    padding: 1em;
  }
  h2 {
    font-size: var(--fs-400);
  }
  ul {
    list-style: none;
    padding: 0;
    border-left: 0.2px solid var(--clr-font-text-soft);
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-block: 0.6em;
  }

  .link-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  a {
    font-size: var(--fs-300);
    text-decoration: none;
    color: var(--clr-font-text-soft);
  }

  a::before {
    content: '•';
    position: relative;
    left: -0.45ch;
    padding-right: 0.5em;
    font-size: var(--fs-400);
    vertical-align: middle;
  }

  a:hover::before {
    color: var(--clr-primary-main);
  }

	.active a::before{
		color: var(--clr-primary-main);
	}
</style>