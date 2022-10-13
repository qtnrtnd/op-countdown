<template>
  <main>
    <countdown
      @countdownend="countdownEndHandler"
    />
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    deadline: new Date('2022-10-20')
  }),
  methods: {
    countdownEndHandler () {
      alert('finn')
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
    background-color: white;
    padding: 0 2%;
  }
</style>
