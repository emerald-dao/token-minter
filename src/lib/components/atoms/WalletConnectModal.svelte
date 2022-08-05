<script>
  import {
    Container,
    FlowConnect,
    Stack,
    TransparentCard,
  } from "$lib/components/atoms/index";
</script>

<div class="connection-wrapper">
  <Container>
    <TransparentCard accent={true} padding="4rem">
      <h3>Connect to Touchstone</h3>
      <Stack>
        <p>Please connect your Flow wallet to generate your collection</p>
        <FlowConnect />
      </Stack>
    </TransparentCard>
  </Container>
</div>

<style type="scss">
  .connection-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: var(--fs-500);
      margin-bottom: 1.4rem;
      text-align: center;
    }
    p {
      text-align: center;
      font-size: var(--fs-300);
    }
  }
</style>
