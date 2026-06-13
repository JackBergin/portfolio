import React from 'react';
import { HeadFC } from 'gatsby';
import { ThemeProvider } from '../../context/ThemeContext';
import Layout from '../../components/Layout';
import ProjectGrid from '../../components/ProjectGrid';
import { personalProjects } from '../../data/portfolio';

const PersonalProjects: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="kicker text-ink/60 mb-3 rise">Nights & weekends</p>
          <h1
            className="font-display text-[clamp(2.4rem,7vw,5rem)] mb-4 rise"
            style={{ animationDelay: '0.05s' }}
          >
            Personal Projects.
          </h1>
          <p
            className="max-w-2xl text-lg text-ink/80 mb-12 rise"
            style={{ animationDelay: '0.1s' }}
          >
            Agentic AI platforms, browser tooling, hardware hacks, and a few
            academic capstones. Filter by focus, tap a card for detail.
          </p>
          <ProjectGrid projects={personalProjects} />
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default PersonalProjects;

export const Head: HeadFC = () => <title>Personal Projects — Jack Bergin</title>;
