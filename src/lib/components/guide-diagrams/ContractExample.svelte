<script>
  import PrismJS from "$components/prism/PrismJS.svelte";

  let contract = `pub contract HelloWorld {

    pub let greeting: String;

    access(all) fun hello(): String {
      return self.greeting
    }

    init() {
      self.greeting = "Hello, World!"
    }
  }`
</script>

<PrismJS code={contract} title={'HelloWorld.cdc'}/>