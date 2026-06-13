import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <ThemeProvider>
      <Layout>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-36 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="shape shape--circle fill-a1 w-36 h-36 absolute top-10 right-10 animate-float" />
            <div
              className="shape shape--square fill-a3 w-24 h-24 absolute bottom-10 left-8 animate-float"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="relative">
            <p className="kicker text-ink/60 mb-4">Error 404</p>
            <h1 className="font-display text-[clamp(3rem,12vw,9rem)] mb-6">
              Lost page.
            </h1>
            <p className="max-w-xl text-lg text-ink/80 mb-10">
              We couldn&apos;t find what you were looking for. Let&apos;s get you
              back to solid ground.
            </p>
            <Link to="/" className="btn">
              <i className="fas fa-arrow-left" /> Go Home
            </Link>
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found — Jack Bergin</title>;
