<script>
  import { DropZone, Button, Divider } from "$atoms";
  import { airdrop } from "$flow/actions";
  import { user } from "$stores/FlowStore";
  import { page } from "$app/stores";
  import { airdropCSVStore } from "$stores/CollectionFilesStore";
  import { getContext } from "svelte";
</script>

<div class="input-wrapper">
  <label for="dropZoneCsv">Airdrop Data</label>
  <span class="helper-text"
    >Drop a CSV file below. Your first row should be the addresses you are
    dropping to. The second row should be the "metadataId" of the NFT. You can
    find an NFT's metadataId under the "metadata" box on its sale page. The
    third row should be the serial of the NFT.
    <br />Download this <a href="/assets/airdrop.csv" download>template</a>
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
    deleteAllFilesFromStore={airdropCSVStore.deleteAllFiles}
  />
  <Divider space="1.7rem" />
  <Button
    on:click={() =>
      airdrop(
        $airdropCSVStore.parsedFiles[0],
        $airdropCSVStore.parsedFiles[1],
        $airdropCSVStore.parsedFiles[2],
        $page.params.collection,
        $user.addr,
      )}
    >Airdrop
  </Button>
</div>

<style type="scss">
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
