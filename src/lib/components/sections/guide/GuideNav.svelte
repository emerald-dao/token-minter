<script>
  export let chapters;
</script>

<div>
  <ul>
    {#each chapters as { path, metadata: { title } }}
      <li>
        <a    
          href={
            (path === "./index.md") ? "/guide" :
            path
            .replace("./", "/guide/")
            .replace(".md", "")
            .replace(".svx", "")}
          >
          {title}  
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  div {
    background-color: blue;
  }
</style>