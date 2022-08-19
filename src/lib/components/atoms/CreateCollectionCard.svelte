<script>
  import {
    Stack,
    TransparentCard,
    WalletAddress
  } from "$lib/components/atoms/index";
</script>

<a href={`/collection-generator`}>
  <TransparentCard>
    <div class="main-wrapper" direction="row" align="flex-start">
      Create Collection
    </div>
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
    }
  }
</style>