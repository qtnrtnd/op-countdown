<template>
  <div class="card-container">
    <div class="card" :class="{ 'down': down, 'no-transition': noTransition }">
      <div class="next-top semi-card top">
        <p>{{ twoDigits(nData - 1) }}</p>
      </div>
      <div class="current-bottom semi-card bottom">
        <p>{{ twoDigits(nData) }}</p>
      </div>
      <div class="next-bottom semi-card bottom" @transitionend="resetTransition()">
        <p>{{ twoDigits(nData - 1) }}</p>
      </div>
      <div class="current-top semi-card top">
        <p>{{ twoDigits(nData) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberCardComponent',
  props: {
    n: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      down: false,
      noTransition: true,
      nData: this.n
    }
  },
  watch: {
    n () {
      this.noTransition = false
      this.down = true
    }
  },
  methods: {
    twoDigits (n) {
      return n < 10 ? '0' + n.toString() : n.toString()
    },
    resetTransition () {
      if (this.nData === 0) { this.nData = 59 } else { this.nData-- }
      this.noTransition = true
      this.down = false
    }
  }
}
</script>

<style lang="scss">

  $offset: 3.75rem;

  .card-container{
    margin: 0 1rem;
  }

  .card{
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;

    &.down{
      .next-bottom{
        transform: none;
      }
      .current-top{
        transform: rotateX(-180deg);
      }
    }

    &.no-transition {

      .next-bottom,
      .current-top{
        transition: none;
      }

    }

    p{
      font-size: 15rem;
      user-select: none;
    }
  }

  .semi-card{
    width: 23rem;
    height: 7.5rem;
    background-color: lightblue;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;

    &.top{
      background-color: $darkblue;
      p{
        position: relative;
        bottom: -$offset;
        color: rgba(255,255,255,0.8);
      }
    }

    &.bottom{
      background-color: adjust-color($darkblue, $lightness: 5%);
      p{
        position: relative;
        bottom: $offset;
        color: rgba(255,255,255,0.9);
      }
    }
  }

  .next-bottom,
  .current-top{
    position: absolute;
    transition: transform .7s;
    backface-visibility: hidden;
  }

  .current-top{
    top: 0;
    transform-origin: bottom;
    z-index: 1;
  }

  .next-bottom{
    bottom: 0;
    transform-origin: top;
        transform: rotateX(180deg);

  }
</style>
