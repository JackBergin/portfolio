import React from 'react';
import { experience } from '../data/portfolio';
import Reveal from './Reveal';

const Experience: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <Reveal>
        <p className="kicker text-ink/60 mb-3">Where I&apos;ve worked</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-12">Experience.</h2>
      </Reveal>

      <div className="flex flex-col gap-6">
        {experience.map((role, i) => (
          <Reveal
            as="article"
            key={`${role.company}-${role.period}`}
            delay={i * 80}
            className="card relative overflow-hidden lift"
          >
            {/* accent strip down the left edge */}
            <span
              className={`absolute left-0 top-0 bottom-0 w-3 fill-${role.accent}`}
            />
            <div className="pl-4 flex flex-col gap-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">
                    {role.title}
                  </h3>
                  <p className="kicker mt-1">
                    <span className={`text-ink`}>{role.company}</span>
                  </p>
                </div>
                <span className="kicker text-ink/60">{role.period}</span>
              </div>

              <ul className="flex flex-col gap-2">
                {role.points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-base sm:text-lg">
                    <span className={`mt-2 shrink-0 w-2 h-2 fill-${role.accent} shape--circle`} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
