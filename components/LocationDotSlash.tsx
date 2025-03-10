export const LocationDotSlash = ({
  className,
  title,
  onClick,
}: {
  readonly title?: string;
  readonly className?: string;
  readonly onClick?: () => void;
}) => (
  <svg
    className={className}
    onClick={onClick}
    viewBox="0 0 640 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    {title && <title>{title}</title>}

    <path
      d="M154 95.42C187.3 38.35 249.2 0 320 0C426 0 512 85.96 512 192C512 230.7 489 282.8 459 334.5L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L154 95.42zM257.8 176.8L349.6 248.7C370.1 238 384 216.7 384 192C384 156.7 355.3 128 320 128C289.9 128 264.7 148.8 257.8 176.8zM296.3 499.2C245.9 436.2 132.3 285.2 128.1 196.9L406.2 416.1C382.7 449.5 359.9 478.9 343.7 499.2C331.4 514.5 308.6 514.5 296.3 499.2V499.2z"
      fill="currentColor"
    />
  </svg>
);
