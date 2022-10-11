<template>
  <div class="card-content">
    <div :class="[{ 'down': down, 'no-transition': noTransition }, 'card', type]">
      <div class="next-top semi-card top">
        <p>{{ twoDigits(compMinus) }}</p>
      </div>
      <div class="current-bottom semi-card bottom">
        <p ref="pBottom">
          {{ twoDigits(comp) }}
        </p>
      </div>
      <div class="next-bottom semi-card bottom" @transitionend="transitionEndHandler">
        <p>{{ twoDigits(compMinus) }}</p>
      </div>
      <div class="current-top semi-card top">
        <p ref="pTop">
          {{ twoDigits(comp) }}
        </p>
      </div>
    </div>
    <div class="label-container">
      <p ref="label" class="label" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'NumberCardComponent',
  props: {
    type: {
      type: String,
      default: 's'
    },
    countdown: {
      type: Number,
      default: 0
    },
    animate: {
      type: Boolean,
      default: true
    },
    bus: {
      type: Object,
      default: new Vue()
    }
  },
  data: function () {
    return {
      down: false,
      noTransition: true
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
  created () {
    this.bus.$on('immediate_render', (value) => {
      requestAnimationFrame(() => {
        this.transitionEndHandler(null, value)
      })
    })
  },
  mounted () {
    this.$watch('compMinus', function () {
      if (this.comp !== this.compMinus && this.countdown > 0) {
        this.animate ? this.fireTransition() : this.transitionEndHandler()
      }
    }, { immediate: true })
    this.$refs.label.innerHTML = this.fullString(this.type)
  },
  methods: {
    twoDigits (value) {
      value = Math.max(value, 0)
      return value < 10 ? '0' + value : value
    },
    fireTransition () {
      this.noTransition = false
      this.down = true
    },
    transitionEndHandler (e, value = null) {
      this.noTransition = true
      this.down = false
      this.$refs.pTop.textContent =
      this.$refs.pBottom.textContent =
      this.twoDigits(value ? this[this.type](value - 1) : this.compMinus)
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
          str = 'Sec<span>ondes</span>'
          break
        case 'm':
          str = 'Min<span>utes</span>'
          break
        case 'h':
          str = 'H<span>eures</span>'
          break
        case 'd':
          str = 'J<span>ours</span>'
          break
      }
      return str
    }
  }
}
</script>

<style lang="scss">

  $offset: 0.281em;

  .card-container{

    &:not(:last-child){
      margin-right: 2em;
    }
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
      font-size: 8em;
      user-select: none;
    }
  }

  .semi-card{
    width: 13em;
    height: 4.5em;
    background-color: lightblue;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75em;

    &.top{
      background-color: $darkblue;
      p{
        position: relative;
        bottom: -$offset;
        color: rgba(255,255,255,0.75);
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

  .label-container{
    margin-top: 1.9em;

  }

  .label{
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
    color: white;
    padding: 0.6em;
    border-radius: 0.3em;
    background-image: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.09) 50%);
    letter-spacing: 0.1em;
    font-weight: 500;
  }
</style>
