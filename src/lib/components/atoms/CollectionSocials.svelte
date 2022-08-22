<script>
  import { BallButton } from "$lib/components/atoms/index";

  export let collectionSocials;
</script>


{#if collectionSocials.website}
  <a href={collectionSocials.website.url} target="_blank">
    <BallButton icon="ion:globe"/>
  </a>
{/if}
{#if collectionSocials.discord}
  <a href={collectionSocials.discord.url} target="_blank">
    <BallButton icon="ion:logo-discord"/>
  </a>
{/if}
{#if collectionSocials.twitter}
  <a href={collectionSocials.twitter.url} target="_blank">
    <BallButton icon="ion:logo-twitter"/>
  </a>
{/if}