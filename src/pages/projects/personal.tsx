import React from 'react';
import { HeadFC } from 'gatsby';
import { ThemeProvider } from '../../context/ThemeContext';
import Layout from '../../components/Layout';
import ProjectGrid from '../../components/ProjectGrid';

const PersonalProjects: React.FC = () => {
  const projects = [
    // Add your personal projects here
    {
      title: 'Project 1',
      description: 'Description of project 1',
      link: 'https://github.com/yourusername/project1'
    },
    // Add more projects...
  ];

  return (
    <ThemeProvider>
      <Layout>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Personal Projects</h1>
          <ProjectGrid projects={projects} />
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default PersonalProjects;

export const Head: HeadFC = () => <title>Personal Projects - Jack Bergin</title>; 