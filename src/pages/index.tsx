import React from 'react';
import { HeadFC } from 'gatsby';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';
import About from '../components/About';
import Skills from '../components/Skills';

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <div className="max-w-4xl mx-auto px-4">
          <About />
          <Skills />
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Jack Bergin - Portfolio</title>;
