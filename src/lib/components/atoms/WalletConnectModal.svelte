<script>
  import { fly } from "svelte/transition";
  import { Stack, TouchstoneIcon, Divider, FlowConnect } from "$atoms";
  import { backInOut } from 'svelte/easing';

  let duration = 2000;
  let easing = backInOut;
  let options = {duration, easing, times: 1}
  function spin(node, options) {
		const {times = 1} = options;
		return {
			...options,
			// The value of t passed to the css method
			// varies between zero and one during an "in" transition
			// and between one and zero during an "out" transition.
			css(t) {
				// Svelte takes care of applying the easing function.
				const degrees = 100 * times; // through which to spin
				return `transform: translate(${(t - 1) * -10}px) rotate(${(t-1) * degrees}deg); opacity: ${1 * t};`;
			}
		};
	}

  export let logoUrl = "/flow-logo.png"
</script>

<article transition:fly="{{ y: 100, duration: 800 }}">
  <Stack direction="column" gap="2.7rem">
    <Stack direction="column" gap="0rem">
      <h6>Connect</h6>
      <span class="subtitle">Wallet</span>
    </Stack>
    <div class="logos">
      <div class="flow-logo pulse" transition:fly="{{ y: -15, duration: 1800, delay: 200 }}">
        <img src={logoUrl} alt="Flow Logo">
      </div>
      <div class="touchstone-icon-container rotate" transition:spin={options} >
        <TouchstoneIcon width="1.6rem"/>
      </div>
    </div>
    <Divider space="0"/>
    <FlowConnect type="accent-color" size="large"/>
  </Stack>
</article>

<style type="scss">
  article {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -54%);
    background-color: var(--clr-primary-main);
    box-shadow: 0 0 6px 0px var(--clr-primary-strong);
    color: var(--clr-font-text-inverse);
    padding: 2rem;
    z-index: 9999;
    border-radius: 1.6rem;
    width: 25ch;

    h6 {
      font-size: var(--fs-400);
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.2ch;
      color: var(--clr-primary-soft-t2);
      margin: 0;
      max-width: 20ch;
      text-align: center;
    }
    .subtitle {
      font-size: var(--fs-200);
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 0.5ch;
      color: var(--clr-primary-soft-t6);
      margin: 0;
      max-width: 20ch;
      text-align: center;
    }

    .logos {
      position: relative;

      .flow-logo {
        border-radius: 999rem;
        width: 120px;
        padding: 0;
      }

      .touchstone-icon-container {
        border-radius: 9999px;
        position: absolute;
        bottom: -12px;
        right: -16px;
        border: 4px var(--clr-primary-main) solid;
        box-sizing: border-box;
        box-shadow: 0 0 10px 1px var(--clr-primary-soft-t7);
      }
    }
  }

  @keyframes pulse {
    70% {
      -webkit-transform: scale(1.12) rotate(3deg);
      box-shadow: 0 0 0 0px var(--clr-primary-soft-t8);
    }
    80% {
      box-shadow: 0 0 1px 3px var(--clr-primary-soft-t9);
    }
    100% {
      -webkit-transform: scale(1) rotate(0deg);
      box-shadow: 0 0 3px 10px rgba(3, 3, 3, 0);
    }
  }

  .pulse {
    animation-name: pulse;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 1.8s;
    animation-delay: 1s;
  }

  @keyframes rotate {
    33% {
      -webkit-transform: rotate(20deg);
    }
    66% {
      -webkit-transform: rotate(-20deg);
    }
    100% {
      -webkit-transform: rotate(0deg);
    }
  }

  .rotate {
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
    animation-duration: 3s;
  }
</style>
