import { type FC, useRef } from 'react'
import { useTicks } from '~lib/hooks/useTicks'

export const Time: FC<{ children?: never }> = () => {
  const ref = useRef<HTMLSpanElement>(null)
  useTicks(ref)

  return <span ref={ref} />
}
