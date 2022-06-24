<script>  
  import { t } from '$lib/guide/translations'; 
	import { onMount, tick } from 'svelte'
  import { TransparentCard } from '$lib/components/atoms/index'

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
  let specialCharacters = /[^a-zA-Z0-9\s\-]+/g;

  const getToc = () => {
    contentsArray.forEach((content) => {
      if (content.level === 2) {
        toc = [...toc,
          {
            title: content.title,
            path: content.title.replace(specialCharacters, "").replace(/ /g,"-").toLowerCase()
          }
        ]
      }
    })
  }

  let toc = []
</script>

<svelte:window on:scroll={trackScroll} />

<section>
  <TransparentCard>
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
  </TransparentCard>
</section>

<style type="scss">
  @use "../../../styles/abstracts" as *;

  section {
    margin-bottom: 2em;

    
    @include mq(medium) {
      margin-bottom: 0;
    }
  }

  h2 {
    font-size: var(--fs-400);
    text-shadow: none;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-block: 0.4em;
    
    @include mq(medium) {
      border-left: 0.2px solid var(--clr-font-text-soft);
    }
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


  @include mq(medium) {
    a::before {
      content: '•';
      position: relative;
      left: -0.45ch;
      padding-right: 0.5em;
      font-size: var(--fs-400);
      vertical-align: middle;
    }
   }

  a:hover::before {
    color: var(--clr-primary-main);
  }

	.active a::before{
		color: var(--clr-primary-main);
	}
</style>