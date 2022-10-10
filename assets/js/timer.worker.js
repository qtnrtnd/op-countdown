self.addEventListener('message', (e) => {
  const step = function () {
    const dt = Date.now() - expected // the drift (positive for overshooting)
    /* if (dt > interval) {
      console.warn('The drift exceeded the interval.')
    } */
    countdown--
    self.postMessage(countdown)
    if (countdown > 0) {
      expected += interval
      setTimeout(step, Math.max(0, interval - dt)) // take into account drift
    } else {
      self.close()
    }
  }
  const interval = 1000 // ms
  let expected = Date.now() + interval
  let countdown = e.data
  setTimeout(step, interval)
})
