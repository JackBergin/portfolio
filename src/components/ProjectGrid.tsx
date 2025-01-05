import React from 'react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="bg-gradient-to-r from-light-gradient-1 to-light-gradient-2 
                        dark:from-dark-gradient-1 dark:to-dark-gradient-2 
                        rounded-lg p-6 h-48 flex flex-col justify-center items-center
                        transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-center">{project.description}</p>
            <i className="fab fa-github text-2xl text-white/80 mt-4 
                       group-hover:text-white transition-colors duration-300"></i>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid; 