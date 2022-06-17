<script>
  import { navItems } from '$lib/config/config'
</script>

<ul>
  {#each navItems as navItem }
    <li>
      <a 
        href={navItem.route} 
        sveltekit:prefetch={navItem.prefetch}
        target={navItem.target}
      >
        {navItem.title}
      </a>
    </li>
  {/each}
  <slot/>
</ul>

<style type="scss">
  @use "../../styles/abstracts" as *;

  ul {
    display: flex;
    flex-direction: inherit;
    list-style-type: none;
    gap: 2em;
    padding: 0;
    font-family: var(--font-mono);
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  li {
    font-size: var(--fs-400);
    
    @include mq(medium) {
      font-size: var(--fs-300);
    }
  }
  
  a {
    text-decoration: none;
  }
</style>