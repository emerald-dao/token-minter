<script>
  import { fly } from "svelte/transition";
  import { navigating, page } from "$app/stores";
  import {
    Container,
    Logo,
    ThemeToggle,
    AnimatedHamburger,
    FlowConnect,
    Stack,
    Select,
    DiscordInvite,
  } from "$lib/components/atoms/index.js";
  import Navigation from "$lib/components/modules/Navigation.svelte";
  import { t, locales, locale } from "$lib/guide/translations";
  import { goto } from "$app/navigation";
  import { getFindProfile } from "../../../flow/utils";
  import { user } from "../../../flow/stores.js";

  let findProfile = getFindProfile($user?.addr);

  export let open = false;
  export let onClick = () => {
    open = !open;

    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  };

  let onPageChange = () => {
    open = false;
    document.body.style.overflowY = "scroll";
  };

  $: if ($navigating) onPageChange();
</script>

<header>
  <Container class="width-x-large gutter-y-none">
    <nav>
      <!-- Desktop menu -->
      <div class="desktop-menu">
        <Logo />
        <Navigation />
        <Stack direction="row" gap="0.5em">
          <DiscordInvite />
          <ThemeToggle />
          {#if $page.url.pathname.includes("guide")}
            <Select
              on:change={({ target }) => goto(`/guide${target.value}/welcome`)}>
              {#each $locales as lc}
                <option value="/{lc}" selected={lc === $locale}
                  >{$t(`lang.${lc}.flag`)}</option>
              {/each}
            </Select>
          {/if}
          <FlowConnect />
          {#if $user?.loggedIn}
            {#await findProfile then profile}
              <a href="/my-collections" sveltekit:prefetch>
                {#if profile}
                  <img
                    class="avatar"
                    src={profile.avatar}
                    alt={`${profile.name} avatar`} />
                {:else}
                  <img
                    class="avatar"
                    src="https://find.xyz/assets/img/avatars/avatar16.png"
                    alt="default avatar" />
                {/if}
              </a>
            {/await}
          {/if}
        </Stack>
      </div>

      <!-- Mobile menu -->
      <div class="mobile-menu">
        <Logo />
        <div class="mobile-options">
          <AnimatedHamburger {open} {onClick} />
          {#if $user?.loggedIn}
            {#await findProfile then profile}
              <a href="/my-collections" sveltekit:prefetch>
                {#if profile}
                  <img
                    class="avatar"
                    src={profile.avatar}
                    alt={`${profile.name} avatar`} />
                {:else}
                  <img
                    class="avatar"
                    src="https://find.xyz/assets/img/avatars/avatar16.png"
                    alt="default avatar" />
                {/if}
              </a>
            {/await}
          {/if}
        </div>
      </div>
      {#if open}
        <div
          class="hamburger-navigation"
          transition:fly={{ y: -200, duration: 400 }}>
          <Navigation>
            <Stack direction="row" gap="1rem">
              <DiscordInvite />
              <ThemeToggle />
            </Stack>

            <div class="close-button">
              <AnimatedHamburger {open} {onClick} />
            </div>
            {#if $page.url.pathname.includes("guide")}
              <Select
                on:change={({ target }) =>
                  goto(`/guide${target.value}/welcome`)}>
                {#each $locales as lc}
                  <option value="/{lc}" selected={lc === $locale}
                    >{$t(`lang.${lc}.flag`)}</option>
                {/each}
              </Select>
            {/if}
            <FlowConnect />
          </Navigation>
        </div>
      {/if}
    </nav>
  </Container>
</header>

<style type="scss">
  @use "../../styles/abstracts" as *;

  header {
    padding: 10px 0 10px 0;

    @include mq(medium) {
      z-index: 9999;
      position: sticky;
      background-color: var(--clr-background-primary-t4);
      backdrop-filter: blur(20px);
      width: 100%;
      top: 0;
      border-bottom: 2px var(--clr-accent-main-t7) solid;
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
      text-align: center;
      padding: 10px;
      z-index: 9999;
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

      .mobile-options {
        display: flex;
        flex-direction: row;
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
  }

  .avatar {
    height: 42px;
    border-radius: 0.6rem;
    border: 2px var(--clr-accent-main) solid;
    margin-left: 0.4rem;
    transition: 0.4s;
  }
  .avatar:hover {
    box-shadow: var(--clr-accent-main) 4px 4px;
    color: var(--clr-font-text-inverse);
    transform: translateY(-3px);
  }
</style>
