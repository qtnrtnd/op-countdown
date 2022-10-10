<template>
  <div class="countdown">
    <div v-for="(cardType, i) in cardTypes" :key="i" class="card-container">
      <number-card :type="cardType" :countdown="countdown" :animate="animate && !documentHidden" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownComponent',
  props: {
    template: {
      type: String,
      default: 'd h m s'
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
      cardTypes: this.template.split(' '),
      countdown: this.initial,
      documentHidden: false
    }
  },
  created () {
    if (process.browser) {
      const worker = this.$worker.createWorker()
      worker.addEventListener('message', this.workerResponseHandler)
      worker.postMessage(this.countdown)
    }
  },
  mounted () {
    const that = this
    document.addEventListener('visibilitychange', function () {
      that.documentHidden = document.visibilityState !== 'visible'
    })
  },
  methods: {
    workerResponseHandler: function (e) {
      this.countdown = e.data
    }
  }
}
</script>

<style lang="scss">
    .card-container{
        margin: 0 1rem;
    }
</style>
