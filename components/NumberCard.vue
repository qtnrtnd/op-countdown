<template>
  <div class="card-container" :class="{lever: lever}" @click="lever = !lever">
    <div class="card">
      <div class="current-top semi-card top">
        <p>{{ twoDigits(n) }}</p>
      </div>
      <div class="current-bottom semi-card bottom">
        <p>{{ twoDigits(n) }}</p>
      </div>
      <div class="next-top semi-card top">
        <p>{{ twoDigits(n + 1) }}</p>
      </div>
      <div class="next-bottom semi-card bottom">
        <p>{{ twoDigits(n + 1) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberCardComponent',
  props: {
    n: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    lever: false
  }),
  methods: {
    twoDigits (n) {
      return n < 10 ? '0' + n.toString() : n.toString()
    }
  }
}
</script>

<style lang="scss">
  $offset: 3.75rem;

  .card-container.lever{
    .next-top{
      transform: none;
    }
  .current-bottom{
    transform: rotateX(180deg);
  }

  }

  .card{
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    display: inline-block;
    p{
      font-size: 15rem;
    }
  }

  .semi-card{
    width: 23rem;
    height: 7.5rem;
    background-color: lightblue;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;

    &.top{
      background-color: $darkblue;
      p{
        position: relative;
        bottom: -$offset;
        color: rgba(255,255,255,0.8);
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

  .next-top,
  .current-bottom{
    position: absolute;
    transition: transform 1s;
    backface-visibility: hidden;
  }

  .current-bottom{
    bottom: 0;
    transform-origin: top;
    z-index: 1;
  }

  .next-top{
    top: 0;
    transform-origin: bottom;
        transform: rotateX(-180deg);

  }
</style>
