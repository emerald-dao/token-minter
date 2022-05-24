<script>
  export let thumbnailURL;
  export let name;
  export let description;
</script>

<div>
  <img src={thumbnailURL} alt={`${name} image`}>
  <h4>{name}</h4>
  <p>{description}</p>
</div>

<style type="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: solid 0.5px var(--clr-font-text);
    border-radius: 1rem;
    padding: 1.4rem;

    img {
      margin-bottom: 1.4em;
    }
    h4 {
      font-size: var(--fs-400);
      text-shadow: none;
      margin-bottom: 0.6em;
    }
    p {
      font-size: var(--fs-300);
    }
  }
</style>