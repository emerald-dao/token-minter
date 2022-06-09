<script>
  import { fly } from 'svelte/transition'
  import { navigating } from '$app/stores';

  import { Container, Logo, ThemeToggle, AnimatedHamburger, FlowConnect} from "$lib/components/atoms/index.js";
  import Navigation from '$lib/components/modules/Navigation.svelte';
  import Stack from '../atoms/Stack.svelte';

  export let open = false
  export let onClick = () => {
    open = !open

    if (open) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "scroll"
    }
  }

  let onPageChange = () => {
    open = false
    document.body.style.overflowY = "scroll"
  }

  $: if($navigating) onPageChange()
</script>

<header>
  <Container class="width-large">
    <nav>
      <!-- Desktop menu -->
      <div class="desktop-menu">
        <Logo/>
        <Navigation/>
        <Stack direction="row">
          <ThemeToggle/>
          <FlowConnect/>
        </Stack>
      </div>

      <!-- Mobile menu -->
      <div class="mobile-menu">
        <Logo/>
        <AnimatedHamburger {open} {onClick}/>
      </div>
      {#if open}
        <div class="hamburger-navigation" transition:fly={{ y: -200, duration: 400 }}>
          <Navigation>
            <div class="close-button">
              <AnimatedHamburger {open} {onClick}/>
            </div>
          </Navigation>
        </div>
      {/if}
    </nav>
  </Container>
</header>

<style type="scss">
  @use "../../styles/abstracts" as *;

  header {
    padding: 0;
  }

  .hamburger-navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-background-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    z-index: 1;
  }

  .desktop-menu {
    display: none;
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
  }

  .mobile-menu {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    @include mq(medium) {
      display: none;    
    }
  }

  .desktop-menu {
    display: none;    

    @include mq(medium) {
      display: flex;
      flex-direction: row;
      gap: 30px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
</style>