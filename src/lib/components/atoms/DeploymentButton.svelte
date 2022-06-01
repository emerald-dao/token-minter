<script>
  import { Button } from "$lib/components/atoms/index";

  export let title;
  export let description;
  export let onClickAction;
  export let emoji;
  export let accent = false;
</script>

<Button on:click={onClickAction} class={accent ? "" : "ghost"}>
  <div class:accent={accent}>
    <span>{emoji}</span>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
</Button>

<style type="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 20rem;
    
    span {
      font-size: var(--fs-500)
    }
    h4 {
      color: var(--clr-accent-main);
      font-size: var(--fs-400);
    }
    p {
      font-family: var(--font-a);
      font-size: var(--fs-300);
    }
  }

  .accent {
    height: 22rem;

    h4 {
      color: var(--clr-font-text-inverse);
    }
  }
</style>