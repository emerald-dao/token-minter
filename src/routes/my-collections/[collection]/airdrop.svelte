<script>
  import { DropZone, Button, Divider } from "$atoms";
  import { airdrop } from "$flow/actions";
  import { user } from "$stores/FlowStore";
  import { page } from "$app/stores";
  import { airdropCSVStore } from "$stores/CollectionFilesStore";
</script>

<div class="input-wrapper">
  <label for="dropZoneCsv">Airdrop Data</label>
  <span class="helper-text"
    >Drop a CSV file containing airdrop adresses and associated NFT ids.
    <br />Download this <a href="/assets/metadata.csv" download>template</a>
    to see an example.
  </span>
  <DropZone
    name="csv"
    id="csv"
    type="csv"
    placeholder="Drop CSV file"
    errors={$airdropCSVStore.errors}
    fileStore={$airdropCSVStore.files}
    saveFunction={airdropCSVStore.saveFiles}
    deleteFileFromStore={airdropCSVStore.deleteAllFiles}
    deleteAllFilesFromStore={airdropCSVStore.deleteAllFiles} />
  <Divider space="1.7rem" />
  <Button
    on:click={() =>
      airdrop(
        $airdropCSVStore.parsedFiles[0],
        $airdropCSVStore.parsedFiles[1],
        $page.params.collection,
        $user.addr
      )}>Airdrop</Button>
</div>

<style type="scss">
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
