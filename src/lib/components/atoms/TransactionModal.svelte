<script>
  import { transactionStatus, transactionInProgress } from "$stores/FlowStore";
  import { fly } from "svelte/transition";
  import { Stack, TouchstoneIcon, TransactionModalMessage } from "$atoms";
  import {backInOut, linear} from 'svelte/easing';


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
  export let transactionName = "Flow"
  export let loading = false;
</script>

{#if $transactionInProgress || loading}
  <article transition:fly="{{ x: 100, duration: 800 }}">
    <Stack direction="column" gap="2.7rem">
      <Stack direction="column" gap="0rem">
        <h6>{transactionName}</h6>
        <span class="subtitle">Transaction</span>
      </Stack>
      <div class="logos">
        <div class="flow-logo pulse" transition:fly="{{ y: -15, duration: 1800, delay: 200 }}">
          <img src={logoUrl} alt="Flow Logo">
        </div>
        <div class="touchstone-icon-container rotate" transition:spin={options} >
          <TouchstoneIcon width="1.6rem"/>
        </div>
      </div>
      <Stack direction="column" aling="center" justify="center" gap="0.6em">
        {#if transactionName === "IPFS"}
          <TransactionModalMessage 
            title="Uploading Assets" 
            description="Uploading your assets to IPFS."
            progressMessage="Uploading..."/>
        {:else if transactionName === "Flow"}
          {#if $transactionStatus.status < 0}
            <TransactionModalMessage 
              title="Initializing" 
              description="Waiting for transaction approval."
              progressMessage="Initializing..."/>
          {:else if $transactionStatus.status < 2}
            <TransactionModalMessage 
              title="Pending" 
              description="The transaction has been received by a collector but not yet finalized in a block."
              progressMessage="Executing"/>
          {:else if $transactionStatus.status === 2}
            <TransactionModalMessage 
              title="Finalized" 
              description="The consensus nodes have finalized the block that the transaction is included in."
              progressMessage="Executing..."/>
          {:else if $transactionStatus.status === 3 && $transactionStatus.statusCode === 0}
            <TransactionModalMessage 
              title="Executed" 
              description="The execution nodes have produced a result for the transaction."
              progressMessage="Sealing..."
              progress="80"/>
          {:else if $transactionStatus.status === 4 && $transactionStatus.statusCode === 0}
            <TransactionModalMessage 
              title="Sealed" 
              description="The verification nodes have verified the transaction, and the seal is included in the latest block."
              progressMessage="Sealing..."
              progress="100"
              icon="ion:checkmark-circle"/>
          {:else if $transactionStatus.status === 5 && $transactionStatus.statusCode === 0}
            <TransactionModalMessage 
              title="Expired" 
              description="The transaction was submitted past its expiration block height."
              progress={false}/>
          {:else if $transactionStatus.errorMessage && $transactionStatus.statusCode === 1}
            <TransactionModalMessage 
              title="Failed" 
              description={$transactionStatus.errorMessage}
              progress={false}
              icon="ion:close-circle"
              error="true"/>
          {:else}
            <TransactionModalMessage 
              title="Error" 
              description="An error occured."
              progress={false}
              error="true"/>
          {/if}
        {/if}
      </Stack>
    </Stack>
  </article>
{/if}

<style type="scss">
  article {
    position: fixed;
    top: 90px;
    right: 20px;
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
