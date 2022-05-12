<script>

  import LibLoader from './prism/LibLoader.svelte'
  export let code; 


  function prismReady() {
    console.log('carrot s')
  }

</script>

<LibLoader
  url="https://cdn.jsdelivr.net/npm/prismjs@1.28.0/prism.min.js"
  on:loaded={prismReady}
  uniqueId={+new Date()} 
/>


<LibLoader
  url="https://cdn.jsdelivr.net/npm/prismjs@1.28.0/plugins/autoloader/prism-autoloader.min.js"
  on:loaded={prismReady}
  uniqueId={+new Date()} 
/>

<pre><code class="language-swift">{code}</code></pre>
