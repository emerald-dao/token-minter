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
    display: none;
    font-size: var(--fs-400);
    font-weight: 400;
    transition: 0.6s;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    border-radius: 0.5em;
    padding-block: 0.4em;
    margin-block: 0.2em;
    transition: 0.4s;
    
    @include mq(medium) {
      display: flex;
      font-size: var(--fs-300);
    }
  }

  .li-active {
    display: flex;
    color: var(--clr-accent-main);
    
    @include mq(medium) {
      line-height: 1em;
      transition: 0.6s;
      // TODO: Apply dynamic colors
      background-color: hsla(234, 67%, 40%, 0.5);
    }
  }
  .li-clickable {
    cursor: pointer;
  }
</style>