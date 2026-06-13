import React from 'react';
import { experience } from '../data/portfolio';

const stats = [
  { label: 'Years Shipping', value: '4+' },
  { label: 'Companies', value: '3' },
  { label: 'Sensors Targeted', value: '500' },
  { label: 'Dashboard Speedup', value: '10×' },
];

const About: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <p className="kicker text-ink/60 mb-3">By the numbers</p>
      <h2 className="font-display text-4xl sm:text-5xl mb-12">
        Ownership, end to end.
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`card ${i === 0 ? 'card--shadow' : ''} flex flex-col gap-1`}
          >
            <span className="font-display text-4xl sm:text-5xl">{s.value}</span>
            <span className="kicker text-ink/60">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
