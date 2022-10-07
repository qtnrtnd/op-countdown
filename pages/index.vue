<template>
  <main>
    <h1>Auto-destruction d'Optic Performance dans :</h1>
    <div class="countdown">
      <number-card type="d" :initial="initialCountdown" />
      <number-card type="h" :initial="initialCountdown" />
      <number-card type="m" :initial="initialCountdown" />
      <number-card type="s" :initial="initialCountdown" />
    </div>
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
    background-image: linear-gradient(120deg, hsl(11, 70%, 75%), hsl(11, 70%, 50%))
  }
  h1{
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 3rem;
    color: white;
    margin-top: -2rem;
  }
</style>
