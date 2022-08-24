<script>
  import {
    Stack,
    TransparentCard,
    WalletAddress,
    NftImage
  } from "$lib/components/atoms/index";

  export let name;
  export let url;
  export let thumbnailURL;
  export let description;
  export let owner;
</script>

<a href={`/discover${url}`}>
  <TransparentCard border={true} hoverShadow={true}>
    <div class="main-wrapper" direction="row" align="flex-start">
      <NftImage thumbnailURL={thumbnailURL} name={`${name} main image`}/>
      <div class="content-wrapper">
        <Stack direction="column" align="left" gap="0.6em">
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
    max-width: 900px;
    width: 100%;

    .main-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      align-items: center;
      justify-content: center;

      @include mq(small) {
        display: grid;
        grid-template-columns: 14rem 1fr;
        gap: 1.8rem;
      }

      .content-wrapper {
        padding-block: 2em;

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
