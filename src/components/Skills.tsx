import React from 'react';
import { skills } from '../data/portfolio';
import Reveal from './Reveal';

const Skills: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <Reveal>
        <p className="kicker text-ink/60 mb-3">The toolbox</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-12">Skills.</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 90}
            className="card flex flex-col gap-4 lift"
          >
            <div className="flex items-center gap-3">
              <span
                className={`shape shape--square fill-${group.accent} w-6 h-6`}
              />
              <h3 className="font-display text-xl">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
