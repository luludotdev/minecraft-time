import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Tooltip } from '~components/Tooltip'
import { useAnimationFrame } from './useAnimationFrame'

export const useTooltip = (text: string, ref: RefObject<HTMLElement>) => {
  const [shown, setShown] = useState(false)
  const coords = useRef({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  const onMouseOver = useCallback(
    (ev: MouseEvent) => {
      setShown(true)

      coords.current.x = ev.x
      coords.current.y = ev.y
    },
    [setShown]
  )

  const onMouseMove = useCallback((ev: MouseEvent) => {
    coords.current.x = ev.x
    coords.current.y = ev.y
  }, [])

  const onMouseOut = useCallback(() => {
    setShown(false)
  }, [setShown])

  useAnimationFrame(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${coords.current.x}px`
      tooltipRef.current.style.top = `${coords.current.y}px`
    }
  }, [])

  useEffect(() => {
    const current = ref.current
    current?.addEventListener('mouseover', onMouseOver)
    current?.addEventListener('mousemove', onMouseMove)
    current?.addEventListener('mouseout', onMouseOut)

    return () => {
      current?.removeEventListener('mouseover', onMouseOver)
      current?.removeEventListener('mousemove', onMouseMove)
      current?.removeEventListener('mouseout', onMouseOut)
    }
  }, [ref, onMouseOver, onMouseMove, onMouseOut])

  return <Tooltip ref={tooltipRef} text={text} hidden={!shown} />
}
