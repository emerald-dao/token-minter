<script>
  export let verifiers;

  console.log(verifiers);

  function convertToRequirement(verifier) {
    const metadata = verifier.metadata;
    if (verifier.verifier === "Singular FLOAT") {
      return `You must own the <a href=${metadata.url} target="_blank" style="display: flex; justify-content: center; align-items: center; text-decoration: none; font-size: 12px;"><img style="display: inline; width: 25px;" src="https://cloudflare-ipfs.com/ipfs/${metadata.eventImage}" alt="FLOAT" /> ${metadata.eventName} FLOAT</a>.`;
    } else if (verifier.verifier === "Has Emerald Pass") {
      return `You must have an active Emerald Pass subscription to mint.`;
    }
  }
</script>

<article>
  {#each verifiers as verifier}
    <span>
      {verifier.passing ? "Check!" : "Failed."}
      {@html convertToRequirement(verifier)}
    </span>
  {/each}
</article>

<style>
  article {
    border: 1px solid white;
    padding: 10px;
  }

  span {
    font-size: 12px;
    display: flex;
    justify-self: center;
    align-items: center;
  }
</style>
