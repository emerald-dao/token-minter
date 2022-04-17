

<script>
  import Prism from 'prismjs';
  import 'prismjs/themes/prism.css';
  import "prismjs/components/prism-swift.js";
  
  export let code;
  
</script>

<style>
  pre {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius:0.2rem;
  }
</style>

<pre><code>{@html Prism.highlight(code, Prism.languages.swift, 'swift')}</code></pre>

