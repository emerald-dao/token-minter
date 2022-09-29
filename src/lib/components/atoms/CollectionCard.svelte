<script>
  import {
    Stack,
    TransparentCard,
    WalletAddress,
    NftImage
  } from "$atoms";

  export let name;
  export let url;
  export let thumbnailURL;
  export let description;
  export let owner;
  export let accent = false;
</script>

<a href={`${url}`}>
  <TransparentCard border={true} hoverShadow={true} {accent}>
    <div class="main-wrapper" direction="row" align="flex-start">
      <NftImage thumbnailURL={thumbnailURL} name={`${name} main image`}/>
      <div class="content-wrapper">
        <Stack direction="column" align="left" gap="0.9em">
          <h2>{name}</h2>
          <WalletAddress address={owner}>Made by</WalletAddress>
          <p class="description">
            {description}
          </p>
        </Stack>
      </div>
    </div>
  </TransparentCard>
</a>

<style type="scss">
  @use "../../styles/abstracts" as *;

  a {
    text-decoration: none;
    color: var(--clr-font-text);
    max-width: 74rem;
    width: 100%;

    .main-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      align-items: center;
      justify-content: center;
      padding: 1rem;

      @include mq(small) {
        display: grid;
        grid-template-columns: 18rem 1fr;
        gap: 2.4rem;
      }

      .content-wrapper {
        padding-block: 2em;

        @include mq(small) {
          padding-block: 0;
        }

        h2 {
          // color: var(--clr-accent-main);
          font-size: var(--fs-600);
        }
        .description {
          font-size: var(--fs-300);
          color: var(--clr-font-text-t3)
        }
      }
    }
  }
</style>
