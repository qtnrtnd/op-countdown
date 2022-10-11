<template>
  <main>
    <countdown title="Auto-destruction d'Optic Performance dans :" :initial="initialCountdown" template="dhms" :animate="true" @countdownend="countdownEndHandler" />
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    initialCountdown: 5
  }),
  methods: {
    countdownEndHandler () {
      alert('Fin !!!')
    }
  }
}
</script>

<style lang="scss">
  main{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F47C62;
    padding: 0 2%;
  }
</style>
