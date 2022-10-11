<template>
  <div class="countdown-component">
    <h1>{{ title }}</h1>
    <div class="countdown">
      <div v-for="(cardType, i) in cardTypes" :key="i" class="card-container">
        <number-card :type="cardType" :countdown="countdown" :animate="animate" :bus="bus" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CountdownComponent',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    template: {
      type: String,
      default: 'dhms'
    },
    initial: {
      type: Number,
      default: 0
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      cardTypes: this.template.split(''),
      countdown: this.initial,
      documentHidden: false,
      paused: false,
      launchPause: null,
      bus: new Vue()
    }
  },
  created () {
    if (process.browser) {
      this.worker = this.$worker.createWorker()
      this.worker.addEventListener('message', this.workerResponseHandler)
      this.worker.postMessage({ subject: 'start', value: this.countdown })
    }
  },
  mounted () {
    const that = this
    document.addEventListener('visibilitychange', function () {
      that.documentHidden = document.visibilityState !== 'visible'
      if (that.documentHidden) {
        that.launchPause = setTimeout(() => {
          that.paused = true
          that.worker.postMessage({ subject: 'pause' })
        }, 1000)
      } else if (that.paused) {
        that.paused = false
        that.worker.postMessage({ subject: 'start' })
      } else { clearTimeout(that.launchPause) }
    })
  },
  methods: {
    workerResponseHandler: function (e) {
      if (e.data.subject === 'update') {
        this.countdown = e.data.value
      } else if (e.data.subject === 'immediate_render') {
        this.bus.$emit('immediate_render', e.data.value)
      } else if (e.data.subject === 'end') {
        this.$emit('countdownend')
      }
    }
  }
}
</script>

<style lang="scss">

  .countdown-component{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .countdown{
    display: flex;
    font-size: max(min(1.2vw, 1.1rem), 0.3rem);
  }

  h1{
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 3rem;
    color: white;
    margin-top: -2rem;
    text-align: center;
  }

  @media (max-width: 1180px) {
    .countdown{
      .label{
        text-transform: none;
        span{
          display: none;
        }
      }
    }
  }

</style>
