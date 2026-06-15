import React, { useEffect, useState } from 'react';

/**
 * Thin accent bar pinned to the top of the viewport that tracks reading
 * progress through the page.
 */
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  );
};

export default ScrollProgress;
