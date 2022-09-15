<script>
  export let title;
  export let flowLogo = false;
  export let stat;
</script>

<div>
  <strong>
    {#if flowLogo}
      <img src="/flow-logo.png" alt="flow logo" />
    {/if}
    {stat}
  </strong>
  <p>{title}</p>
</div>

<style type="scss">
  div {
    min-width: 6.5rem;

    p {
      font-size: var(--fs-300);
      text-align: left;
      color: var(--clr-font-text-t7)
    }
    
    strong {
      display: flex;
      align-items: center;
      font-size: var(--fs-400);
      font-weight: 600;

      img {
        width: 25px;
        margin-right: 5px;
      }
    }
  }
</style>