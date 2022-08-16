<script>
  import {
		Stack
	} from "$lib/components/atoms/index";

  export let title;
  export let description;
</script>

<div>
  <Stack slot="title" direction="row" gap="0.5em" align="center" justify="flex-start">
    <slot/>
    <h4>
      {title}
    </h4>
  </Stack>
  <p>
    {@html description}
  </p>
</div>

<style type="scss">
  h4 {
    font-size: var(--fs-400);
  }
  p {
    font-size: var(--fs-300);
    margin-top: 1em;
    margin-bottom: 2em;
  }
</style>