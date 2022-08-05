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
      <Stack>
        <p>Connect your Flow wallet to generate your collection</p>
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

    p {
      text-align: center;
    }
  }
</style>