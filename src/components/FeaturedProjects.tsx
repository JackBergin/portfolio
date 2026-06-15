import React from 'react';
import { Link } from 'gatsby';
import { professionalProjects, personalProjects } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

const featured = [...professionalProjects, ...personalProjects]
  .filter((p) => p.featured)
  .slice(0, 3);

const FeaturedProjects: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <div>
          <p className="kicker text-ink/60 mb-3">Selected work</p>
          <h2 className="font-display text-4xl sm:text-5xl">Featured.</h2>
        </div>
        <Link to="/projects/professional" className="btn btn--ghost">
          All Work <i className="fas fa-arrow-right" />
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <Reveal key={project.title} delay={i * 100} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
