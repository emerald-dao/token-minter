<script>
  import Icon from "@iconify/svelte";
  import {
    Stack,
    TransparentCard,
  } from "$lib/components/atoms/index";
</script>

<a href={`/collection-generator`}>
  <TransparentCard accent={true}>
    <Stack direction="row" gap="0.5em" justify="center">
      <Icon icon="ion:add-circle" width="1.4em" color="var(--clr-accent-main)"/>
      <div class="main-wrapper" direction="row" align="flex-start">
        <span>
          Create Collection
        </span>
      </div>
    </Stack>
  </TransparentCard>
</a>

<style type="scss">
  @use "../../styles/abstracts" as *;

  a {
    text-decoration: none;
    color: var(--clr-font-text);
    max-width: 900px;
    width: 100%;

    .main-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 1.8rem;

      @include mq(small) {
        flex-direction: row;
      }

      span {
        font-size: var(--fs-400);
        font-weight: 700;
        color: var(--clr-accent-main);
      }
    }
  }
</style>