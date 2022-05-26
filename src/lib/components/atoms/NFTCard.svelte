<script>
  export let thumbnailURL;
  export let name;
  export let description;
</script>

<div class="card">
  <img src={thumbnailURL} alt={`${name} image`}>
  <div class="content">
    <h4>{name}</h4>
    <p>{description}</p>
  </div>
</div>

<style type="scss">
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    background-color: hsla(0, 0%, 50%, 0.1);
    border-radius: 1rem;
    padding: 0.8em;

    img {
      margin-bottom: 1.2em;
      border-radius: 0.4rem;
    }
    h4 {
      font-size: var(--fs-300);
      text-shadow: none;
      margin-bottom: 0.4em;
    }
    p {
      font-size: var(--fs-200);
    }
  }
</style>