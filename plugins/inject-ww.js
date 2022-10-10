import TimerWorker from '~/assets/js/timer.worker.js'

export default (context, inject) => {
  inject('worker', {
    createWorker () {
      return new TimerWorker()
    }
  })
}
