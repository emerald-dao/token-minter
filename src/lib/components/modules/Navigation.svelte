<script>
  import { navItems } from "$lib/config/config";

  export let gap = "3em";
  export let color = "var(--clr-accent-main)";
</script>

<ul style={`gap: ${gap}`}>
  {#each navItems as navItem}
    <li>
      <a
        href={navItem.route}
        sveltekit:prefetch={navItem.prefetch}
        target={navItem.target}
        style={`color: ${color}`}>
        {navItem.title}
      </a>
    </li>
  {/each}
  <slot />
</ul>

<style type="scss">
  @use "../../styles/abstracts" as *;

  ul {
    display: flex;
    flex-direction: inherit;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-family: var(--font-mono);
    text-align: inherit;
    justify-content: inherit;
    align-items: inherit;

    @include mq(medium) {
      text-align: left;
      justify-content: flex-start;
      align-items: flex-start;
      width: auto;
    }
  }

  li {
    font-size: var(--fs-400);

    @include mq(medium) {
      font-size: var(--fs-200);
    }
  }

  a {
    text-decoration: none;
    transition: 0.3s;
  }
  a:hover {
    color: var(--clr-accent-strong);
  }
</style>
