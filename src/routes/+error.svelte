<script context="module">
  export const load = ({error, status}) => {
    return {
      props: {
        error,
        status
      }
    }
  }
</script>

<script>
  import { Section, Container, Stack } from "$components/atoms"
  export let error;
  export let status;
</script>

<Section>
  <Container>
    <Stack direction="column" align="center" justify="center">
      <h1>{status}</h1>
      <p>{error.message}</p>
    </Stack>
  </Container>
</Section>

<style type="scss">
  h1 {
    font-size: var(--fs-800);
    background: linear-gradient(
      to left,
      var(--clr-primary-main),
      var(--clr-accent-main)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>