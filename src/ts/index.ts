import '../styles/fonts.styl'
import '../styles/styles.styl'

const time = document.getElementById('time')
if (time === null) throw new Error('Time element is null!')

const setTime = () => {
  const ticks = (Date.now() / 50).toFixed(0)
  time.innerHTML = ticks

  requestAnimationFrame(setTime)
}

requestAnimationFrame(setTime)
