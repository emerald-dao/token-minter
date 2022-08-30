<script>
  import { Divider, BallButton, Button } from "$atoms";

  export let collectionName;
</script>

<img src="/images/guide/ballerz.png" alt="Collection main"/>
<h4>{collectionName}</h4>
<Divider line={true} lineWidth="2px" space="2rem" lineColor="var(--clr-accent-main-t9)"/>
<BallButton
  icon="ion:settings"
>
  General
</BallButton>
<a href="/collection-generator">
  <BallButton
    icon="ion:gift"
  >
    Airdrop
  </BallButton>
</a>
<Divider space="3rem" />
<BallButton
  icon="ion:trash"
  danger={true}
>
  Remove
</BallButton>
<Divider line={true} lineWidth="2px" space="2rem" lineColor="var(--clr-accent-main-t9)"/>
<Button class="small transparent" leftIcon="arrow-back-circle" href="/my-collections">Back to My Collections</Button>

<style>
  img {
    width: 100%;
    background-color: red;
    margin-bottom: 1.3rem;
    border-radius: 0.8rem;
  }

  h4 {
    font-size: var(--fs-400);
  }
  
  a {
    text-decoration: none;
  }
</style>