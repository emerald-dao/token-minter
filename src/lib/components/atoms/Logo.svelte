<script>
	import { Stack, TouchstoneIcon } from "$lib/components/atoms/index";
  import { dappTitle  } from '$lib/config/config';
</script>

<a href="/">
  <Stack direction="row" gap="0.35em">
    <TouchstoneIcon/>
    <span>{dappTitle}</span>
  </Stack>
</a>

<style type="scss">
  a {
    text-decoration: none;

    span {
      font-family: var(--font-primary);
      font-size: var(--fs-400);
      color: var(--clr-accent-main);
      text-transform: uppercase;
      font-weight: 900;
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