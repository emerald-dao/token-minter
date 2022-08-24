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
    color: var(--clr-font-text-inverse);
    background-color: var(--clr-primary-main);
    border-radius: 0.4rem;
		padding: 4rem;
		box-shadow: var(--clr-accent-soft) 8px 8px, var(--clr-accent-soft-t6) 16px 16px;
  }
</style>