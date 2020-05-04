import { getTimes } from 'suncalc'

const enum SkyState {
  Day = 'day',
  Night = 'night',
  Dawn = 'dawn',
  Dusk = 'dusk',

  Unknown = 'unknown',
}

const getSkyState: (coords: Coordinates, now?: Date) => SkyState = (
  coords,
  now = new Date()
) => {
  const { dawn, dusk, sunriseEnd, sunsetStart } = getTimes(
    now,
    coords.latitude,
    coords.longitude
  )

  if (now > dawn && now < sunriseEnd) return SkyState.Dawn
  if (now > sunriseEnd && now < sunsetStart) return SkyState.Day
  if (now > sunsetStart && now < dusk) return SkyState.Dusk
  if (now < dawn || now > dusk) return SkyState.Night

  return SkyState.Unknown
}

const setSky = () => {
  window.navigator.geolocation?.getCurrentPosition(
    pos => {
      const state = getSkyState(pos.coords)
      if (state === SkyState.Unknown) return

      document.documentElement.classList.add(state)
    },
    err => console.error(err)
  )
}

setSky()
setInterval(() => {
  setSky()
}, 1000 * 60 * 5)
