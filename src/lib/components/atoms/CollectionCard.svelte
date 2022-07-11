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

<a href={url}>
  <TransparentCard>
    <Stack direction="row" align="flex-start">
      <img src={thumbnailURL} alt="Collection thumbnail">
        <div class="main-wrapper">
          <Stack direction="column" align="left" gap="0.6em">
            <h2>{name}</h2>
            <p class="owner">By {owner}</p>
            <p class="description">
              {description}
            </p>
          </Stack>
        </div>
      </Stack>
  </TransparentCard>
</a>

<style type="scss">
  a {
    text-decoration: none;
    color: var(--clr-font-text);

    img {
      border-radius: 1em;
      width: 30%;
    }
   
    .main-wrapper {
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

</style>