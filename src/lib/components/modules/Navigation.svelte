<ul>
  <li>
    <a href="/collection-generator" sveltekit:prefetch>Collection Generator</a>
  </li>
  <li>
    <a href="/guide/welcome" sveltekit:prefetch>Guide</a>
  </li>
  <li>
    <a href="https://discord.com/invite/emeraldcity" target="_blank">Emerald City</a>
  </li>
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