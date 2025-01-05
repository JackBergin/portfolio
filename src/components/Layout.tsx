import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <header className="bg-gradient-to-r from-light-gradient-1 to-light-gradient-2 dark:from-dark-gradient-1 dark:to-dark-gradient-2 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="absolute right-4 top-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                  </svg>
                )}
              </button>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-center">Jack Bergin</h1>
            <p className="text-xl mb-6 text-center">Full Stack Software Engineer & Robotics Engineer</p>
            
            <nav className="flex justify-center space-x-8">
              <Link to="/" className="hover:text-blue-300 transition-colors">
                Home
              </Link>
              <Link to="/projects/professional" className="hover:text-blue-300 transition-colors">
                Professional Projects
              </Link>
              <Link to="/projects/personal" className="hover:text-blue-300 transition-colors">
                Personal Projects
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gradient-to-r from-light-gradient-1 to-light-gradient-2 dark:from-dark-gradient-1 dark:to-dark-gradient-2 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8">
            <a href="mailto:jack.christopher.bergin@gmail.com" className="hover:text-blue-300 transition-colors">
              <i className="fas fa-envelope mr-2"></i>
              Email
            </a>
            <a href="https://linkedin.com/in/jackcbergin" className="hover:text-blue-300 transition-colors">
              <i className="fab fa-linkedin mr-2"></i>
              LinkedIn
            </a>
            <a href="https://github.com/JackBergin" className="hover:text-blue-300 transition-colors">
              <i className="fab fa-github mr-2"></i>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 