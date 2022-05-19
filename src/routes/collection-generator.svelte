<script>
  // We import our page components (similar to the one above).
  import CollectionInfo from '$lib/components/sections/generator/CollectionInfo.svelte';
  import Upload from '$lib/components/sections/generator/Upload.svelte';

  const pages = [CollectionInfo, Upload];

  // The current page of our form.
  let page = 0;

  // The state of all of our pages
  let pagesState = [];

  // Our handlers
  function onSubmit(values) {
    if (page === pages.length - 1) {
      // On our final page we POST our data somewhere
      return fetch('https://example.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pagesState),
      }).then(response => {
        // We handle the response
      });
    } else {
      // If we're not on the last page, store our data and increase a step
      pagesState[page] = values;
      pagesState = pagesState; // Triggering update
      page +=1;
    }
  }

  function onBack(values) {
    if (page === 0) return;
    pagesState[page] = values;
    pagesState = pagesState; // Triggering update
    page -= 1;
  }
</script>

<!-- We display the current step here -->
<svelte:component
  this={pages[page]}
  {onSubmit}
  {onBack}
  initialValues={pagesState[page]}
/>