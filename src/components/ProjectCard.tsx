import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const hasBullets = !!project.bullets?.length;

  return (
    <article
      className={`card lift relative overflow-hidden flex flex-col gap-4 h-full ${
        project.featured ? 'card--shadow' : ''
      }`}
    >
      {/* accent corner block */}
      <span
        className={`absolute top-0 right-0 w-16 h-16 fill-${project.accent} border-l-4 border-b-4 border-ink`}
        style={{ borderBottomLeftRadius: 24 }}
        aria-hidden
      />

      <header className="flex flex-col gap-2 pr-14">
        <div className="flex flex-wrap items-center gap-2">
          <span className="kicker text-ink/60">{project.company}</span>
          {project.period && (
            <span className="kicker text-ink/40">· {project.period}</span>
          )}
        </div>
        <h3 className="font-display text-xl sm:text-2xl leading-tight">
          {project.title}
        </h3>
      </header>

      <p className="text-base leading-relaxed text-ink/90">{project.summary}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags
          .filter((t) => t !== 'Featured')
          .map((t) => (
            <span
              key={t}
              className="kicker text-ink/60 border-2 border-ink/30 rounded-full px-3 py-1 text-[0.7rem]"
            >
              {t}
            </span>
          ))}
      </div>

      {/* expandable detail */}
      {hasBullets && open && (
        <ul className="flex flex-col gap-2 pt-1">
          {project.bullets!.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span
                className={`mt-1.5 shrink-0 w-2 h-2 fill-${project.accent} shape--circle`}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* actions */}
      <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
        {hasBullets && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="chip chip--btn"
            aria-expanded={open}
          >
            {open ? 'Less' : 'Details'}
            <i className={`fas fa-chevron-${open ? 'up' : 'down'}`} />
          </button>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="chip chip--btn fill-a2 text-bg border-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fab fa-github" /> Code
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
