<template>
  <main>
    <h1>Auto-destruction d'Optic Performance dans :</h1>
    <number-card :n="countdown" />
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    countdown: 6000
  }),
  mounted () {
    /* const days = Math.floor(this.countdown / (1000 * 60 * 60 * 24))
    const hours = Math.floor((this.countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((this.countdown % (1000 * 60 * 60)) / (1000 * 60)) */
    this.s = Math.floor((this.countdown % (1000 * 60)) / 1000)
  }
}
</script>
