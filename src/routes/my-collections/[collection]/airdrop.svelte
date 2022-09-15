<script>
  import { DropZone, Button, Divider } from '$atoms'
</script>

<div class="input-wrapper">
  <label for="dropZoneCsv">Airdrop Data</label>
  <span class="helper-text"
    >Drop a CSV file containing airdrop adresses.
    <br />Download this <a href="/assets/metadata.csv" download>template</a>
    to have a basic CSV structure.
  </span>
  <DropZone
    name="csv"
    id="csv"
    type="csv"
    placeholder="Drop CSV file"
  />
  <Divider space="1.7rem"/>
  <Button>Airdrop</Button>
</div>

<style type="scss">
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>