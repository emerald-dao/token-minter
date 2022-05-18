

<script>
  import Prism from './prism.js';
  export let code = '';
</script>

<div class="code">
  <pre><code>{@html Prism.highlight(code, Prism?.languages?.swift)}</code></pre>
</div>

<svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet" />
</svelte:head>


<style>
  pre {
    padding: 1rem;
    background-color: hsla(0, 0%, 0%, 0.2);
    border-radius:0.2rem;
    overflow: auto;
  }

  code {
    white-space: pre-wrap;
    font-size: 12px;
  }
</style>


