<template>
  <main>
    <h1>Auto-destruction d'Optic Performance dans :</h1>
    <div class="countdown">
      <number-card :n="d" />
      <number-card :n="h" />
      <number-card :n="m" />
      <number-card :n="s" />
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    countdown: 120
  }),
  computed: {
    s () {
      return this.countdown % 60
    },
    m () {
      return Math.floor(this.countdown / 60) % 60
    },
    h () {
      return Math.floor(this.countdown / 60 / 60) % 24
    },
    d () {
      return Math.floor(this.countdown / 60 / 60 / 24) % 24
    }
  },
  mounted () {
    const that = this
    const timer = setInterval(() => {
      that.countdown--
      if (that.countdown === 0) { clearInterval(timer) }
    }, 1000)
  }
}
</script>

<style lang="scss">
  .countdown{
    display: flex;
  }
</style>
