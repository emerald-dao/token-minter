<script>
	import { Stack, TouchstoneIcon } from "$atoms";
  import { dappTitle  } from '$lib/config/config';
</script>

<a href="/">
  <Stack direction="row" gap="0.4em">
    <TouchstoneIcon/>
    <span>{dappTitle}</span>
  </Stack>
</a>

<style type="scss">
  a {
    text-decoration: none;

    span {
      font-family: var(--font-primary);
      font-size: 20px;
      color: var(--clr-accent-main);
      text-transform: uppercase;
      --font-weight: 700;
      letter-spacing: 0.2ch;
      font-style: italic;
      background: linear-gradient(
        to left,
        var(--clr-primary-main),
        var(--clr-accent-main)
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>