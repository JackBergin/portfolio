import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Element tag to render. Defaults to a div. */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Reveals its children with a rise + fade the first time they scroll into
 * view. Falls back to immediately visible when IntersectionObserver is
 * unavailable, and the `.js`-gated CSS keeps content visible without JS.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
