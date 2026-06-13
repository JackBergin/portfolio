import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { useTheme } from '../context/ThemeContext';
import { about, contact } from '../data/portfolio';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects/professional', label: 'Work' },
  { to: '/projects/personal', label: 'Personal' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      {/* subtle paper texture behind everything */}
      <div className="paper-grid fixed inset-0 -z-10 pointer-events-none" />

      <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur border-b-4 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="shape shape--square fill-a1 w-10 h-10 flex items-center justify-center font-display text-bg text-lg">
              JB
            </span>
            <span className="font-display text-lg sm:text-xl hidden sm:inline">
              {about.name}
            </span>
          </Link>

          <div className="flex items-center gap-5 sm:gap-8">
            <nav className="flex items-center gap-4 sm:gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={toggleTheme}
              className="shape shape--circle w-10 h-10 flex items-center justify-center bg-card lift"
              aria-label="Toggle ink / paper theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t-4 border-ink mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <p className="kicker text-ink/60 mb-3">Let&apos;s build something</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-8">Get in touch.</h2>

          <div className="flex flex-wrap gap-4">
            <a className="btn" href={`mailto:${contact.email}`}>
              <i className="fas fa-envelope" /> Email
            </a>
            <a
              className="btn btn--ghost"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" /> LinkedIn
            </a>
            <a
              className="btn btn--ghost"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" /> GitHub
            </a>
          </div>

          <p className="kicker text-ink/50 mt-12">
            © {new Date().getFullYear()} {about.name} · {about.location}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
