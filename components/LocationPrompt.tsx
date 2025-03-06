import type { FC } from "react";
import css from "styled-jsx/css";
import { LocationDot } from "~/components/LocationDot";
import { LocationDotSlash } from "~/components/LocationDotSlash";

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
`;

interface Props {
  readonly enabled: boolean;
  readonly onClick: () => void;

  readonly children?: never;
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

    <div className="container">
      {enabled ? (
        <LocationDotSlash
          className={className}
          onClick={onClick}
          title="Disable location-based background"
        />
      ) : (
        <LocationDot
          className={className}
          onClick={onClick}
          title="Enable location-based background"
        />
      )}
    </div>

    {styles}
  </>
);
