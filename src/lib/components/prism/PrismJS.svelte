<script>
  import Prism from './prism.js';
  export let title = 'Code'
  export let code = '';
</script>

<div class="wrapper">
  <div class="code-header">{title}</div>
  <pre><code>{@html Prism.highlight(code, Prism?.languages?.swift)}</code></pre>
</div>

<!-- <svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet" />
</svelte:head> -->

<style type="scss">
  .wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    border-radius: 0.4em;

    .code-header {
      background-color: hsla(0, 0%, 0%, 1);
      padding: 0.6em 2em;
      margin: 0;
      position: sticky;
      top: 0;
      color: var(--clr-primary-main);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }
    
    pre {
      padding: 0;
      margin: 0;
      background-color: hsla(0, 0%, 0%, 0.1);
      white-space: pre-wrap;
      tab-size: 1em;
      padding-inline: 2em;
    }
    
    code {
      font-size: 12px;
      font-family: var(--font-mono);
    }
  }
</style>


