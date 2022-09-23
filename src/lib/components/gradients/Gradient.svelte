<script type="ts">
  export let color = "var(--clr-background-gradient-main-t3)";
  export let left = "25%";
  export let top = "45%";
  export let width = "600px"
  export let height = "600px"
  export let blur = "100px"
</script>

<div class="gradient" style={`background-color: ${color}; left: ${left}; top: ${top}; width: ${width}; height: ${height}; filter: blur(${blur});`}/>

<style type="scss">
  div {
    transform: translateY(-50%) translateX(-50%);
    position: absolute;
    border-radius: 100%;
    animation-name: move;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    opacity: 0.5;
  }

  @keyframes move {
    0%   {transform: scale(0.9) rotate(0);}
    50%   {transform: scale(1.4) rotate(360deg); opacity: 0.35;}
    100% {transform: scale(0.9) rotate(0);}
  }
</style>