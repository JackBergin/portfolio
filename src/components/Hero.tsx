import React from 'react';
import { Link } from 'gatsby';
import { about, contact } from '../data/portfolio';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b-4 border-ink">
      {/* Floating decorative shapes bleeding off the edges */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="shape shape--circle fill-a2 w-40 h-40 absolute -top-12 -right-10 opacity-90 animate-float" />
        <div
          className="shape shape--square fill-a4 w-28 h-28 absolute top-40 -left-10 animate-float"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="shape shape--pill fill-a3 w-44 h-20 absolute bottom-10 right-16 hidden md:block animate-float"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <p className="kicker text-ink/70 mb-6 rise">
          {about.location} · Available for hands-on roles
        </p>

        <h1
          className="font-display text-[clamp(2.8rem,9vw,7rem)] mb-6 rise"
          style={{ animationDelay: '0.05s' }}
        >
          {about.name}
        </h1>

        <div
          className="flex flex-wrap items-center gap-3 mb-8 rise"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="chip fill-a1 text-bg border-ink">
            {about.title}
          </span>
          <span className="chip">{about.tagline}</span>
        </div>

        <p
          className="max-w-2xl text-lg sm:text-xl leading-relaxed rise"
          style={{ animationDelay: '0.15s' }}
        >
          {about.blurb}
        </p>

        <div
          className="flex flex-wrap gap-4 mt-10 rise"
          style={{ animationDelay: '0.2s' }}
        >
          <Link to="/projects/professional" className="btn">
            View Work <i className="fas fa-arrow-right" />
          </Link>
          <a className="btn btn--ghost" href={`mailto:${contact.email}`}>
            <i className="fas fa-envelope" /> Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
