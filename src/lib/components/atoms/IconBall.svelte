<script>
  import Icon from "@iconify/svelte";

  export let icon;
  export let size = "2rem";
</script>

<div 
  class="icon-ball" 
  style={`width:${size}; min-width:${size}; height:${size}`}
>
  <Icon
    icon={`${icon}`}
    color="var(--clr-accent-main-t2)" />
</div>

<style type="scss">
  .icon-ball {
    padding: 0.5rem;
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    transition: 0.8s;
    background-color: var(--clr-accent-main-t7);
  }
</style>