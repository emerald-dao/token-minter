<script>
  import { user } from "../../../flow/stores";
  import { Divider, BallButton } from "$lib/components/atoms/index";
</script>

<h4>{$user.addr}</h4>
<Divider line={true} lineWidth="2px" space="3rem" lineColor="var(--clr-accent-main-t9)"/>
<BallButton
  active={true}
  icon="ion:albums"
>
  My Collections
</BallButton>
<a href="/collection-generator">
  <BallButton
    icon="ion:add-circle"
  >
    New Collection
  </BallButton>
</a>

<style>
  h4 {
    font-size: var(--fs-400);
  }
  
  a {
    text-decoration: none;
  }
</style>
