import TimerWorker from '~/assets/op-countdown/js/timer.worker.js'

export default (context, inject) => {
  inject('worker', {
    createTimerWorker () {
      return new TimerWorker()
    }
  })
}
