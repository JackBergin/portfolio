import React from 'react';
import { skills } from '../data/portfolio';

const Skills: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <p className="kicker text-ink/60 mb-3">The toolbox</p>
      <h2 className="font-display text-4xl sm:text-5xl mb-12">Skills.</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((group) => (
          <div key={group.title} className="card flex flex-col gap-4 lift">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
