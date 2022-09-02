<script>
  import { Stack, Verifier } from "$atoms";

  export let verifiers;
</script>

<Stack direction="row">
  {#each verifiers as verifier}
    <Verifier
      name={verifier.metadata.name}
      checked={verifier.passing}
      href={verifier.metadata.url}
      tooltip={verifier.metadata.description} />
  {/each}
</Stack>
