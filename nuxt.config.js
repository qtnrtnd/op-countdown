export default {

  plugins: [
    { src: '~/plugins/op-countdown-ww.js', ssr: false }
  ],

  components: true,

  build: {
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          loader: 'worker-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
