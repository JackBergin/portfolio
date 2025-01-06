import React from 'react';
import { HeadFC } from 'gatsby';
import { ThemeProvider } from '../../context/ThemeContext';
import Layout from '../../components/Layout';
import ProjectGrid from '../../components/ProjectGrid';

const PersonalProjects: React.FC = () => {
  const projects = [
    {
      title: 'EnvoyAI',
      description: 'A platform for AI agents to interact with each other. They are able to collectively solve problems in a round robin fashion or in a step by step fashion.',
      link: 'https://github.com/EnvoyAI-Org'
    },
    {
      title: 'Media Newsletter Generator',
      description: 'Take any subreddit and youtube video, and generate a newsletter.',
      link: 'https://github.com/JackBergin/newsletter-generation'
    },
    {
      title: 'Horizon AR',
      description: 'Augmented Reality for marketing and sales. Take a brand to the next level.',
      link: 'https://github.com/JackBergin/horizon-ar/'
    },
    {
      title: 'LLM Chrome Extension',
      description: 'A chrome extension that allows you to chat with any website using an LLM.',
      link: 'https://github.com/JackBergin/llm-chrome-plugin'
    },

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