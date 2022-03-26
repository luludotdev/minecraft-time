import clsx from 'clsx'
import { forwardRef } from 'react'

interface Props {
  text: string
  hidden: boolean
}

export const Tooltip = forwardRef<HTMLDivElement, Props>(
  ({ text, hidden }, ref) => (
    <>
      <style jsx>{`
        div {
          --font-size: 16px;
          --spacing: 0.125em;
          --colour-bg: rgba(16, 0, 16, 0.94);
          --colour-gradient: linear-gradient(
            rgba(80, 0, 255, 0.31),
            rgba(40, 0, 127, 0.31)
          );

          position: fixed;
          top: 0;
          left: 0;
          transform: translate(6px, -105%);

          color: white;
          background-color: var(--colour-bg);

          font-size: 16px;
          padding: calc(var(--spacing) * 3);

          white-space: nowrap;
          margin: var(--spacing) calc(var(--spacing) * 2);
          pointer-events: none;

          visibility: visible;
          z-index: 9999;
        }

        div.hidden {
          visibility: hidden;
        }

        div::before {
          content: '';
          position: absolute;
          pointer-events: none;

          top: var(--spacing);
          right: calc(var(--spacing) * -1);
          bottom: var(--spacing);
          left: calc(var(--spacing) * -1);

          border: var(--spacing) solid var(--colour-bg);
          border-style: none solid;
          border-colour: var(--colour-bg);
        }

        div::after {
          content: '';
          position: absolute;
          pointer-events: none;

          top: var(--spacing);
          right: 0;
          bottom: var(--spacing);
          left: 0;

          border: var(--spacing) solid;
          border-image: var(--colour-gradient) 1;
        }
      `}</style>

      <div ref={ref} className={clsx(hidden && 'hidden')}>
        {text}
      </div>
    </>
  )
)
