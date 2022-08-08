<script>
  import {
    Section,
    Container,
    Stack,
    FlowConnect,
    TransparentCard,
    NFTCard,
  } from "$lib/components/atoms/index";

  export let name;
  export let url;
  export let thumbnailURL;
  export let description;
  export let owner;
</script>

<a href={`/discover${url}`}>
  <TransparentCard>
    <div class="main-wrapper" direction="row" align="flex-start">
      <img src={thumbnailURL} alt="Collection thumbnail" />
      <div class="content-wrapper">
        <Stack direction="column" align="left" gap="0.6em">
          <h2>{name}</h2>
          <p class="owner">By {owner}</p>
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

    .main-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 1.8rem;

      @include mq(small) {
        flex-direction: row;
      }

      img {
        border-radius: 1em;
        width: 100%;

        @include mq(small) {
          width: 30%;
        }
      }

      .content-wrapper {
        padding-block: 2em;

        h2 {
          color: var(--clr-accent-strong);
          font-size: var(--fs-600);
        }
        .owner {
          color: var(--clr-accent-main);
          background-color: var(--clr-accent-main-t8);
          font-size: var(--fs-200);
          font-weight: 500;
          padding: 0.2em 0.9em;
          border-radius: 0.8rem;
          width: fit-content;
          margin-bottom: 1em;
        }
        .description {
          font-size: var(--fs-300);
        }
      }
    }
  }
</style>
