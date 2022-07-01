<script>
  import { NumberBall } from './index'

  export let active = false;
  export let clickable = false;
  export let passed = false;
  export let number
</script>

<li 
  class:li-active={active} 
  class:li-clickable={clickable}
  class:li-passed={passed}
  on:click
>
  <NumberBall active={active} passed={passed}>
    {number}
  </NumberBall>
  <slot/>
</li>

<style type="scss">
  @use "../../styles/abstracts" as *;
  
  li {
    display: flex;
    font-weight: 400;
    transition: 0.6s;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    border-radius: 0.5em;

    transition: 0.4s;
    width: 100%;
    color: var(--clr-accent-main-t3);
    padding-block: 0.6em;
    transition: 1s;
    font-size: var(--fs-200);
    
    @include mq(medium) {
      display: flex;
      font-size: var(--fs-300);
    }
  }

  .li-active {
    font-size: var(--fs-300);
    color: var(--clr-primary-main);
  }
  .li-clickable {
    cursor: pointer;
  }
  .li-passed {
    color: var(--clr-primary-main-t5);
  }
</style>