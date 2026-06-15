import React from 'react';

interface MonogramProps {
  className?: string;
}

/**
 * JB monogram mark. Mirrors the favicon so the header logo and browser-tab
 * icon read as the same brand. Colors are driven by CSS variables so it
 * adapts to the ink/paper theme; hover/press animation lives in global.css.
 */
const Monogram: React.FC<MonogramProps> = ({ className = '' }) => (
  <svg
    className={`monogram ${className}`}
    viewBox="0 0 64 64"
    role="img"
    aria-label="JB monogram"
  >
    <rect
      className="monogram__plate"
      x="3"
      y="3"
      width="58"
      height="58"
      rx="16"
    />
    <text
      className="monogram__text"
      x="32"
      y="35"
      textAnchor="middle"
      dominantBaseline="central"
    >
      JB
    </text>
  </svg>
);

export default Monogram;
