<script>
  export let thumbnailURL;
  export let name;
  export let description;
  export let backgroundColor;
</script>

<div class="card">
  <img src={thumbnailURL} alt={`${name} image`} style={`background-color: ${backgroundColor};`}>
  <div class="content">
    <h4>{name}</h4>
    {#if description}
      <p>{description}</p>
    {/if}
  </div>
</div>

<style type="scss">
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    background-color: var(--clr-neutral-200-t9);
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border: 0.5px var(--clr-neutral-300-t2) solid;
    border-radius: 0.5rem;
    padding: 0.8em;

    img {
      margin-bottom: 1.2em;
      border-radius: 0.4rem;
    }
    h4 {
      font-size: var(--fs-300);
      font-weight: 400;
      text-shadow: none;
      margin-bottom: 0.4em;
      margin-top: 0;
      text-align: center;
    }
    p {
      font-size: var(--fs-200);
    }
  }
</style>