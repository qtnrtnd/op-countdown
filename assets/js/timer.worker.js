const interval = 1000
let lastPause = 0
let paused = false
let expected = Date.now() + interval
let countdown
let endTimeout

const step = function () {
  const dt = Date.now() - expected
  countdown--
  self.postMessage({ subject: 'update', value: countdown })
  if (!paused) {
    if (countdown > 0) {
      expected += interval
      setTimeout(step, Math.max(0, interval - dt))
    } else {
      self.postMessage({ subject: 'end' })
      self.close()
    }
  }
}

self.addEventListener('message', (e) => {
  if (e.data.subject === 'start') {
    expected = Date.now() + interval
    if (e.data.value) {
      countdown = e.data.value
    } else {
      countdown = Math.max(0, Math.round(countdown - (Date.now() - lastPause) / 1000))
      paused = false
      self.postMessage({ subject: 'immediate_render', value: countdown })
    }
    clearTimeout(endTimeout)
    setTimeout(step, interval)
  } else if (e.data.subject === 'pause') {
    lastPause = Date.now()
    paused = true
    endTimeout = setTimeout(() => {
      self.postMessage({ subject: 'end' })
      self.close()
    }, countdown * 1000)
  }
})
