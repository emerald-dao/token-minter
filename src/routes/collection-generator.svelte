<script>
  import CollectionInfo from '$lib/components/sections/generator/CollectionInfo.svelte';
  import Upload from '$lib/components/sections/generator/Upload.svelte';

  const sections = [CollectionInfo, Upload];

  // The current section of our form.
  let section = 0;

  // The state of all of our section
  let sectionState = [];

  // Our handlers
  function onSubmit(values) {
    if (section === section.length - 1) {
      // On our final section we POST our data somewhere
      return fetch('https://example.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionState),
      }).then(response => {
        // We handle the response
      });
    } else {
      // If we're not on the last section, store our data and increase a step
      sectionState[section] = values;
      sectionState = sectionState; // Triggering update
      section +=1;
    }
  }

  function onBack(values) {
    if (section === 0) return;
    sectionState[section] = values;
    sectionState = sectionState; // Triggering update
    section -= 1;
  }
</script>

<svelte:component
  this={sections[section]}
  {onSubmit}
  {onBack}
  initialValues={sectionState[section]}
/>