import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { collectTags } from '../data/portfolio';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  /** Show the category filter bar. */
  filterable?: boolean;
}

const ALL = 'All';

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  filterable = true,
}) => {
  const tags = useMemo(() => [ALL, ...collectTags(projects)], [projects]);
  const [active, setActive] = useState<string>(ALL);

  const visible = useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => p.tags.includes(active)),
    [projects, active]
  );

  return (
    <div className="flex flex-col gap-8">
      {filterable && (
        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={`chip chip--btn ${
                active === tag ? 'chip--active' : ''
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="kicker text-ink/50 py-12 text-center">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
};

export default ProjectGrid;
