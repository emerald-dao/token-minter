<script>
  const handleFileInput = () => {
    console.log(inputElement.files);
  }

  const handleFileDrop = (e) => {
    e.preventDefault();
    inputElement.files = e.dataTransfer.files
    dragOver = false;
    updateThumbnail(dropZone, e.dataTransfer.files[0])
  }

  const updateThumbnail = (dropZoneElement, file) => {
    // Create and append thumbnail element
    const thumbnailElement = document.createElement('div');
    dropZone.removeChild(prompt);
    thumbnailElement.classList.add('drop-zone-thumbnail');
    thumbnailElement.textContent = file.name;
    dropZoneElement.appendChild(thumbnailElement);

    // Create and append icon element
    if (file.type === "text/csv") {
      const csvIcon = document.createElement('span');
      csvIcon.classList.add('icon', 'icon-csv');
      csvIcon.textContent = '📄';
      thumbnailElement.appendChild(csvIcon);
    }
  }

  let inputElement;
  let dropZone;
  let prompt;
  let dragOver = false;
</script>

<div 
  class="drop-zone" 
  class:drop-zone-over={dragOver}
  on:click={inputElement.click()}
  on:dragover={() => dragOver = true}
  on:dragleave={() => dragOver = false}
  on:dragend={() => dragOver = false}
  on:drop={handleFileDrop}
  bind:this={dropZone}
  ondragover="return false"
>
  <span class="prompt" bind:this={prompt}>Drop file here or click to upload</span>
  <input 
    type="file" 
    name="myFile" 
    on:input={handleFileInput}
    bind:this={inputElement}
  />
</div>

<style type="scss">
  .drop-zone {
    max-width: 200px;
    height: 200px;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    color: var(--clr-font-text);
    border: 1px solid var(--clr-primary-main);
    border-radius: 10px;
    transition: 1s;
  }

  .drop-zone-over {
    border-style: solid;
    background-color: var(--clr-primary-main);
  }

  input {
    display: none;
  }

  :global(.drop-zone-thumbnail) {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    background-color: #cccccc;
    background-size: cover;
    position: relative;
  }
</style>
