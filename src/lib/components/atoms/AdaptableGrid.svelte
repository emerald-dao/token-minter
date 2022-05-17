<div>
  <slot/>
</div>

<style type="scss">
  div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(25rem, 100%), 1fr));
		width: 100%;
		grid-gap: 5rem;
  }
</style>