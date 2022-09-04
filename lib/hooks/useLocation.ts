import { useCallback, useEffect, useState } from 'react'
import { getTimes } from 'suncalc'
import { type Sky } from '~/components/Background'

const STORAGE_KEY = 'location'

const getSkyState: (
  coords: GeolocationCoordinates,
  now?: Date
) => Sky | undefined = (coords, now = new Date()) => {
  const { dawn, dusk, sunriseEnd, sunsetStart } = getTimes(
    now,
    coords.latitude,
    coords.longitude
  )

  if (now > dawn && now < sunriseEnd) return 'dawn'
  if (now > sunriseEnd && now < sunsetStart) return 'day'
  if (now > sunsetStart && now < dusk) return 'dusk'
  if (now < dawn || now > dusk) return 'night'

  return undefined
}

export const useLocation = () => {
  const [sky, setSky] = useState<Sky | undefined>(undefined)
  const [enabled, setEnabled] = useState<boolean>(false)

  useEffect(() => {
    const isEnabled = Boolean(localStorage.getItem(STORAGE_KEY))
    setEnabled(isEnabled)
  }, [])

  const toggleEnabled = useCallback(() => {
    const toggled = !enabled
    setEnabled(toggled)

    if (toggled) {
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [enabled, setEnabled])

  const calculateSky = useCallback(() => {
    window.navigator.geolocation?.getCurrentPosition(
      ({ coords, timestamp }) => {
        const ts = new Date(timestamp)
        const newSky = getSkyState(coords, ts)

        setSky(newSky)
      }
    )
  }, [])

  useEffect(() => {
    if (!enabled) {
      setSky(undefined)
      return
    }

    calculateSky()
    const interval = setInterval(() => {
      calculateSky()
    }, 30 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [enabled, calculateSky])

  return { enabled, sky, toggleEnabled }
}
