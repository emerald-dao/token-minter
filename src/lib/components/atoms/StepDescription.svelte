<script>
  export let description;
</script>

<div class="description">
  <h5>Description</h5>
  <p>{description}</p>
</div>

<style type="scss">
  .description {
    background-color: #0163da7f;
    border-radius: 1rem;
    padding: 1.5rem 1.2rem;
    font-weight: 300;
    width: 100%;
    height: 100%;
    transition: 0.5s;
    h5 {
      font-size: var(--fs-400);
      margin-top: 0;
      margin-bottom: 1em;
      font-weight: 500;
    }
    p {
      font-size: var(--fs-200);
    }
  }
</style>