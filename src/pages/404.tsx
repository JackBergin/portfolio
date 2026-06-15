import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Arcade from '../components/Arcade';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <ThemeProvider>
      <Layout>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="shape shape--circle fill-a1 w-36 h-36 absolute top-10 right-10 animate-float" />
            <div
              className="shape shape--square fill-a3 w-24 h-24 absolute bottom-10 left-8 animate-float"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="relative flex flex-col items-center text-center mb-12">
            <p className="kicker text-ink/60 mb-4 rise">Error 404</p>
            <h1
              className="font-display text-[clamp(3rem,12vw,8rem)] mb-5 rise"
              style={{ animationDelay: '0.05s' }}
            >
              You wandered off the map.
            </h1>
            <p
              className="max-w-xl text-lg text-ink/80 mb-8 rise"
              style={{ animationDelay: '0.1s' }}
            >
              This page doesn&apos;t exist — but you found the arcade. Pick a
              game and kill a few minutes.
            </p>
            <Link to="/" className="btn rise" style={{ animationDelay: '0.15s' }}>
              <i className="fas fa-arrow-left" /> Back Home
            </Link>
          </div>

          <div className="relative rise" style={{ animationDelay: '0.2s' }}>
            <Arcade />
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>404 · JB-RUN — Jack Bergin</title>;
