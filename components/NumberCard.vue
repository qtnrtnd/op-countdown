<template>
  <div class="card-container">
    <div class="card" :class="{ 'down': down, 'no-transition': noTransition }">
      <div class="next-top semi-card top">
        <p>{{ twoDigits(compMinus) }}</p>
      </div>
      <div class="current-bottom semi-card bottom">
        <p>{{ twoDigits(comp) }}</p>
      </div>
      <div class="next-bottom semi-card bottom" @transitionend="transitionEndHandler">
        <p>{{ twoDigits(compMinus) }}</p>
      </div>
      <div class="current-top semi-card top">
        <p>{{ twoDigits(comp) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberCardComponent',
  props: {
    initial: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 's'
    }
  },
  data: function () {
    return {
      down: false,
      noTransition: true,
      countdown: this.initial
    }
  },
  computed: {
    comp () {
      return this[this.type](this.countdown)
    },
    compMinus () {
      return this[this.type](this.countdown - 1, 0)
    }
  },
  mounted () {
    this.$watch('compMinus', function () {
      if (this.comp !== this.compMinus && this.countdown > 0) { this.fireTransition() }
    }, { immediate: true })

    const that = this
    const timer = setInterval(() => {
      that.countdown--
      if (that.countdown === 0) { clearInterval(timer) }
    }, 1000)
  },
  methods: {
    twoDigits (value) {
      value = Math.max(value, 0)
      return value < 10 ? '0' + value.toString() : value.toString()
    },
    fireTransition () {
      this.noTransition = false
      this.down = true
    },
    transitionEndHandler () {
      this.noTransition = true
      this.down = false
      this.$el.querySelector('.current-top p').textContent =
      this.$el.querySelector('.current-bottom p').textContent =
      this.twoDigits(this.compMinus)
    },
    s (value) {
      return value % 60
    },
    m (value) {
      return Math.floor(value / 60) % 60
    },
    h (value) {
      return Math.floor(value / 60 / 60) % 24
    },
    d (value) {
      return Math.floor(value / 60 / 60 / 24)
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
    perspective: 1100px;
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
