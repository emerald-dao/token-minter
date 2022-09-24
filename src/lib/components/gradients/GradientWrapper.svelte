<div>
  <div class="rotate">
    <slot/>
  </div>
  
</div>

<style type="scss">
  div {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    overflow-x: hidden;
    overflow-y: hidden;
    
  }
</style>