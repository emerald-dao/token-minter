<script>
  import { theme } from "$lib/stores/ThemeStore"
  import { TransparentCard, AdaptableGrid, NumberBall, Stack } from "$lib/components/atoms/index";
  
  let steps = [
    {
      thumbnailURL: "/images/guide/ui-design.png",
      thumbnailURLWhite: "/images/guide/ui-design-white.png",
      description: "User stores files in UI"
    },
    {
      thumbnailURL: "/images/guide/database.png",
      thumbnailURLWhite: "/images/guide/database-white.png",
      description: "Files are stored in IPFS and a file hash is returned"
    },
    {
      thumbnailURL: "/images/guide/search.png",
      thumbnailURLWhite: "/images/guide/search-white.png",
      description: "User executes smart contract to update metadata with the file hash of the images"
    },
    {
      thumbnailURL: "/images/guide/blockchain.png",
      thumbnailURLWhite: "/images/guide/blockchain-white.png",
      description: "The blockchain is updated with the file hash"
    }
  ];
</script>

 <AdaptableGrid minWidth="18em" gap="0.8em">
  {#each steps as step, i}
    <TransparentCard padding="1.4em">
      <div class="parent-wrapper">
        <div class="image-container">
          {#if $theme === "dark"}
          <img src={step.thumbnailURLWhite} alt={step.name}>
          {:else}
          <img src={step.thumbnailURL} alt={step.name}>
          {/if} 
        </div>
        <div class="step-wrapper">
          <NumberBall>{i + 1}</NumberBall>
          <span>{step.description}</span>
        </div>
      </div>
    </TransparentCard>
  {/each}
</AdaptableGrid>

<style type="scss">
  @use "../../../lib/styles/abstracts" as *;

  .parent-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    
    @include mq(small) {
      flex-direction: row;
    }

    .step-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.8em;

      @include mq(small) {
        flex-direction: row;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
      }
      
      span {
        text-align: center;
        font-size: var(--fs-200);
        
        @include mq(small) {
          text-align: left;
        }
      }
    }

    .image-container {
      padding: 1em;
      max-width: 6em;
      min-width: 6em;
      height: 6em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>