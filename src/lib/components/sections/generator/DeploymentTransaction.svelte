<script>
  import { Container, Section} from "$lib/components/atoms/index";
  import Transaction from "$lib/components/flow/Transaction.svelte";
</script>

<Section>
  <Container>
    <div>
      <Transaction/>
    </div>
  </Container>
</Section>

<style type="scss">
  div {
    background-color: var(--clr-accent-soft);
    border-radius: 0.4rem;
		padding: 4rem;
		box-shadow: var(--clr-accent-main) 8px 8px, var(--clr-accent-hover) 16px 16px;
  }
</style>