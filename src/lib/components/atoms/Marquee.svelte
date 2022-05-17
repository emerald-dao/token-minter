<script>
  export let duration = 10;
  export let repeat = 2;
</script>

<div class="wrapper">
  <div class="content">
    {#each Array(repeat) as _, i}
      <div class="animation center" style="animation-duration: {duration}s">
        <slot/>
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    overflow: hidden; 
    width: 100vw;
    border: 1px solid #ccc;
    border-width: 1px 0 1px 0;
    padding-block: 0.3rem;
    margin-block: 2rem;
  }
  .content {
    width: 10000px;
  }
  .animation {
    animation-name: animation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    float: left;
    font-size: var(--fs-400);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  @keyframes animation {
    100% {
      transform: translateX(-100%);
    }
  }
</style>