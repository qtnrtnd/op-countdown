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
    initialCountdown: 142563
  })
}
</script>

<style lang="scss">
  .countdown{
    display: flex;
  }
</style>
