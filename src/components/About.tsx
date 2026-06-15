import React from 'react';
import { experience } from '../data/portfolio';
import Reveal from './Reveal';

const stats = [
  { label: 'Years Shipping', value: '4+' },
  { label: 'Companies', value: '3' },
  { label: 'Sensors Targeted', value: '500' },
  { label: 'Dashboard Speedup', value: '10×' },
];

const About: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <Reveal>
        <p className="kicker text-ink/60 mb-3">By the numbers</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-12">
          Ownership, end to end.
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 90}
            className={`card ${i === 0 ? 'card--shadow' : ''} flex flex-col gap-1 lift`}
          >
            <span className="font-display text-4xl sm:text-5xl">{s.value}</span>
            <span className="kicker text-ink/60">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default About;
