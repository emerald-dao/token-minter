<script>
  import { Stack, Verifier } from '$atoms'

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

<Stack direction="row">
  <Verifier name="Verifier 1" checked={false} href="https://google.com" tooltip={"You must have an active Emerald Pass subscription to mint."}/>
  <Verifier name="Verifier 2" checked={true}/>
</Stack>