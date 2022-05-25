<script>
  import Prism from './prism.js';
  export let code = '';
</script>

<div class="wrapper">
  <div class="code-header">Your Smart Contract</div>
  <pre><code>{@html Prism.highlight(code, Prism?.languages?.swift)}</code></pre>
</div>

<!-- <svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet" />
</svelte:head> -->

<style type="scss">
  .wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    height: 55vh;
    width: 100%;
    border-radius: 0.2em;
    border: 1px solid black;

    .code-header {
      background-color: var(--clr-background-primary);
      padding: 0.4em 2em;
      margin: 0;
      position: sticky;
      top: 0;
      color: var(--clr-primary-soft);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      border-bottom: 0.5px solid var(--clr-primary-soft);
    }
    
    pre {
      padding: 0;
      margin: 0;
      background-color: hsla(0, 0%, 0%, 0.2);
      white-space: pre-wrap;
      tab-size: 1em;
      padding-inline: 2em;
    }
    
    code {
      font-size: 11px;
    }
  }
</style>


