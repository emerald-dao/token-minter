<script>
  export let height = "200px";
</script>

<div style={`height: ${height}`}/>

<style type="scss">
  div {
    width: 100%;
    border-radius: 0.6rem;
    animation: changeColor 2s infinite ease-in-out;
  }

  @keyframes changeColor {
    0%    { background-color: var(--clr-accent-main-t8) }
    50%   { background-color: var(--clr-accent-main-t9) }
    100%  { background-color: var(--clr-accent-main-t8) }
  }
</style>