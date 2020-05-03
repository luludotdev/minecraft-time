export const time = document.getElementById('time')
if (time === null) throw new Error('Time element is null!')

export const getTime = () => (Date.now() / 50).toFixed(0)

const setTime = () => {
  time.innerHTML = getTime()
  requestAnimationFrame(setTime)
}

requestAnimationFrame(setTime)
