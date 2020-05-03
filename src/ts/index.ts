import copy from 'copy-to-clipboard'

import '../styles/fonts.styl'
import '../styles/styles.styl'

const time = document.getElementById('time')
if (time === null) throw new Error('Time element is null!')

const getTime = () => (Date.now() / 50).toFixed(0)

const setTime = () => {
  time.innerHTML = getTime()
  requestAnimationFrame(setTime)
}

requestAnimationFrame(setTime)

time?.addEventListener('click', () => {
  copy(getTime())
})
