<script>
  export let duration = 15;
  export let repeat = 2;
</script>

<style>
  .wrapper {
    overflow: hidden; 
    max-width: 100vw;
    border: 1px solid #ccc;
    border-width: 1px 0 1px 0;
    padding-block: 0.3rem;
    margin-block: 2rem;
  }
  .content {
    width: 10000px;
  }
  .text {
    animation-name: animation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    float: left;
    padding-inline: 2em;
    font-size: var(--fs-400);
  }
  @keyframes animation {
    100% {
      transform: translateX(-100%);
    }
  }
</style>

<div class="wrapper">
  <div class="content">
    {#each Array(repeat) as _, i}
      <div class="text" style="animation-duration: {duration}s">
        <slot />
      </div>
    {/each}
  </div>
</div>