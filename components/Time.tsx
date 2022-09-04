import { type FC, useRef } from 'react'
import { useTicks } from '~/lib/hooks/useTicks'

interface Props {
  initial?: string
  children?: never
}

export const Time: FC<Props> = ({ initial }) => {
  const ref = useRef<HTMLSpanElement>(null)
  useTicks(ref)

  return <span ref={ref}>{initial}</span>
}
