export const time = document.getElementById('time')
if (time === null) throw new Error('Time element is null!')

// Earliest recorded Minecraft version
// May 10, 2009
const MINECRAFT_EPOCH = 1241910000000

export const getTime = () => ((Date.now() - MINECRAFT_EPOCH) / 50).toFixed(0)

const setTime = () => {
  time.innerHTML = getTime()
  requestAnimationFrame(setTime)
}

requestAnimationFrame(setTime)
