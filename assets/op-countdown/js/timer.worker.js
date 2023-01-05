const INTERVAL = 1000
let lastPause = 0
let paused = false
let expected = Date.now() + INTERVAL
let countdown
let endTimeout

const step = function () {
  const dt = Date.now() - expected
  countdown--
  self.postMessage({ subject: 'update', value: countdown })
  if (!paused) {
    if (countdown > 0) {
      expected += INTERVAL
      setTimeout(step, Math.max(0, INTERVAL - dt))
    } else {
      self.postMessage({ subject: 'end' })
      self.close()
    }
  }
}

self.addEventListener('message', (e) => {
  if (e.data.subject === 'start') {
    let offset
    if (e.data.value) {
      countdown = e.data.value
    } else {
      const r = Math.max(0, countdown * 1000 - (Date.now() - lastPause))
      offset = 1000 - (r % 1000)
      countdown = Math.floor(r / 1000)
      paused = false
      self.postMessage({ subject: 'immediate_render', value: countdown })
    }
    expected = Date.now() + (offset || INTERVAL)
    clearTimeout(endTimeout)
    setTimeout(step, offset || INTERVAL)
  } else if (e.data.subject === 'pause') {
    lastPause = Date.now()
    paused = true
    endTimeout = setTimeout(() => {
      self.postMessage({ subject: 'end' })
      self.close()
    }, countdown * 1000)
  }
})
