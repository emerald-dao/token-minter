<script>
  import Navigation from "$components/modules/Navigation.svelte";
  import {
    Container,
    Logo,
    Stack,
    Socials,
    EmeraldTools,
    Button,
  } from "$atoms";
</script>


<footer>
  <Container class="width-x-large">
    <Stack gap="3.8rem" justify="flex-start" align="flex-start">
      <Logo />
      <nav>
        <div class="left-column">
          <Stack gap="0" align="flex-start">
            <h5>Pages</h5>
            <Navigation color="var(--clr-font-text)" gap="0.7em" />
          </Stack>
          <Stack gap="0" align="flex-start">
            <h5>Emerald City Tools</h5>
            <EmeraldTools color="var(--clr-font-text)" gap="0.7em" />
          </Stack>
        </div>
        <div class="right-column">
          <div class="socials">
            <h5>Follow us</h5>
            <Socials />
          </div>
          <div class="dao-invite">
            <h5>Join us</h5>
            <Button
              class="small"
              leftIcon="logo-discord"
              href="https://discord.com/invite/emeraldcity"
              target="_blank">Emerald City DAO</Button>
          </div>
        </div>
      </nav>
    </Stack>
  </Container>
</footer>
<div class="signature">
  <span
    >Built on <img src="/flow-logo.png" alt="Flow logo" /> Flow by
    <img src="/ec-logo.png" alt="Emerald logo" /> Emerald City DAO</span>
</div>

<style type="scss">
  @use "../../styles/abstracts" as *;

  footer {
    padding-block: 2.8rem;
    background-color: var(--clr-accent-soft-t8);
    border-top: 2px var(--clr-accent-main-t8) solid;

    nav {
      flex-direction: column;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 3em;
      width: 100%;

      @include mq(medium) {
        padding-bottom: 10px;
        flex-direction: row;
        align-items: flex-start;
      }

      .left-column {
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 3em;

        @include mq(small) {
          gap: 7em;
          flex-direction: row;
          align-items: flex-start;
        }
      }

      .right-column {
        display: flex;
        flex-direction: column;
        flex-direction: flex-start;

        @include mq(medium) {
          align-items: flex-end;
        }

        .socials {
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: inherit;
        }

        .dao-invite {
          display: flex;
          flex-direction: column;
          align-items: inherit;
        }
      }

      h5 {
        font-size: var(--fs-300);
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 1.7em;
        margin-top: 0;
        letter-spacing: 0.1em;
        color: var(--clr-accent-main-t1);
      }
    }
  }

  .signature {
    padding-block: 1rem;
    background-color: var(--clr-accent-soft-t7);
    border-top: 2px var(--clr-accent-main-t8) solid;

    span {
      font-size: var(--fs-300);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-family: var(--font-mono);
      text-align: center;
    }
    img {
      width: 1.2em;
      height: 1.2em;
      display: inline;
      margin-left: 0.4em;
      margin-right: 0.3em;
    }
  }
</style>
