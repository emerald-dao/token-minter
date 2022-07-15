<script>
  import { user } from "../../flow/stores";
  import { getContracts } from "../../flow/actions";

  getContracts($user?.addr);
</script>
