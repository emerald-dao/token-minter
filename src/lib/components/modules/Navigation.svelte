<ul>
  <li>
    <a href="/contract-generator" sveltekit:prefetch>Contract Generator</a>
  </li>
  <li>
    <a href="/collection-generator" sveltekit:prefetch>Collection Generator</a>
  </li>
  <li>
    <a href="/guide" sveltekit:prefetch>Guide</a>
  </li>
  <li>
    <a href="https://discord.com/invite/emeraldcity" target="_blank">Emerald City</a>
  </li>
  <slot/>
</ul>

<style>
  ul {
    display: flex;
    flex-direction: inherit;
    list-style-type: none;
    gap: 2em;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
</style>