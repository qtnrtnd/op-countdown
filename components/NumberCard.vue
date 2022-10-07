<template>
  <div class="card-container">
    <div :class="[{ 'down': down, 'no-transition': noTransition }, 'card', type]">
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
    <p class="label">
      {{ fullString(type) }}
    </p>
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
      return this[this.type](this.countdown - 1)
    }
  },
  mounted () {
    this.$watch('compMinus', function () {
      if (this.comp !== this.compMinus && this.countdown > 0) { this.fireTransition() }
    }, { immediate: true })

    const that = this
    const interval = 1000 // ms
    let expected = Date.now() + interval
    setTimeout(step, interval)
    function step () {
      const dt = Date.now() - expected // the drift (positive for overshooting)
      if (dt > interval) {
        console.warn('The drift exceeded the interval.')
      }
      that.countdown--
      if (that.countdown > 0) {
        expected += interval
        setTimeout(step, Math.max(0, interval - dt)) // take into account drift
      }
    }
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
    },
    fullString (char) {
      let str
      switch (char) {
        case 's':
          str = 'Secondes'
          break
        case 'm':
          str = 'Minutes'
          break
        case 'h':
          str = 'Heures'
          break
        case 'd':
          str = 'Jours'
          break
      }
      return str
    }
  }
}
</script>

<style lang="scss">

  $offset: 2.25rem;

  .card-container{
    margin: 0 1rem;
  }

  .card{
    position: relative;
    perspective: 1200px;
    transform-style: preserve-3d;

    &.s{
      .next-bottom,
      .current-top{
        transition-duration: .7s;
      }
    }

    &.m{
      .next-bottom,
      .current-top{
        transition-duration: .9s;
      }
    }

    &.h{
      .next-bottom,
      .current-top{
        transition-duration: 1.1s;
      }
    }

    &.d{
      .next-bottom,
      .current-top{
        transition-duration: 1.3s;
      }
    }

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
      font-size: 8rem;
      user-select: none;
    }
  }

  .semi-card{
    width: 13rem;
    height: 4.5rem;
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
    transition-property: transform;
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

  .label{
    font-size: 0.9rem;
    text-align: center;
    margin-top: 2rem;
    text-transform: uppercase;
    color: white;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background-image: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.09) 50%);
    letter-spacing: 0.1em;
    font-weight: 500;
  }
</style>
