<template>
  <main>
    <h1>Auto-destruction d'Optic Performance dans :</h1>
    <countdown template="d h m s" :initial="initialCountdown" :animate="true" />
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    initialCountdown: 28 * 24 * 60 * 60
  })
}
</script>

<style lang="scss">
  .countdown{
    display: flex;
  }
  main{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F47C62;
  }
  h1{
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 3rem;
    color: white;
    margin-top: -2rem;
  }
</style>
