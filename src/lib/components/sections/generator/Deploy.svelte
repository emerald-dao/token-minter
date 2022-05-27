<script>
  import { Stack, Button } from "$lib/components/atoms/index";
</script>

<div>
  <Button class="small ghost">Download your Code</Button>
  <Button class="small">Deploy to Flow Mainnet</Button>
  <Button class="small ghost">Deploy to Flow Testnet</Button>
</div>

<style type="scss">
  div {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>