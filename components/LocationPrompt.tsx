import { type FC } from 'react'
import css from 'styled-jsx/css'
import { LocationDot } from './LocationDot'
import { LocationDotSlash } from './LocationDotSlash'

const { className, styles } = css.resolve`
  svg {
    width: auto;
    height: 0.95rem;

    opacity: 0.6;
    transition: opacity 0.2s ease;

    cursor: pointer;
    color: var(--text-colour);
  }

  svg:hover {
    opacity: 0.9;
  }

  svg:active {
    opacity: 1;
  }

  svg.enabled {
    color: red;
  }
`

interface Props {
  enabled: boolean
  onClick: () => void

  children?: never
}

export const LocationPrompt: FC<Props> = ({ enabled, onClick }) => (
  <>
    <style jsx>{`
      div.container {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.5rem 0.05rem;

        display: flex;
        width: 1.75rem;
        justify-content: center;
      }
    `}</style>

    <div className='container'>
      {enabled ? (
        <LocationDotSlash
          className={className}
          title='Disable location-based background'
          onClick={onClick}
        />
      ) : (
        <LocationDot
          className={className}
          title='Enable location-based background'
          onClick={onClick}
        />
      )}
    </div>

    {styles}
  </>
)
