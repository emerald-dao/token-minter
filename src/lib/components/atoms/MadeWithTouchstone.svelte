<script>
  import { Stack, TouchstoneIcon } from "$lib/components/atoms/index";
  import { dappTitle } from "$lib/config/config";
</script>

<Stack direction="row" gap="0.3em">
  <TouchstoneIcon width="0.6em" padding="0.2em"/>
  <span>Made with <span class="title">{dappTitle}</span></span>
</Stack>

<style type="scss">
  span {
    font-family: var(--font-primary);
    font-size: var(--fs-100);
    color: var(--clr-accent-main);
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 0.2ch;
    font-style: italic;
    
    .title {
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