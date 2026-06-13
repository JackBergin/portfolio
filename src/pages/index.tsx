import React from 'react';
import { HeadFC } from 'gatsby';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <About />
        <Experience />
        <FeaturedProjects />
        <Skills />
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Jack Bergin — Full Stack Software Engineer</title>
    <meta
      name="description"
      content="Jack Bergin — Full Stack Software Engineer building IoT systems, data infrastructure, and AI tooling."
    />
  </>
);
