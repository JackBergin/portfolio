/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // "Bold & Playful Paper" palette — wired to CSS variables so the
        // ink/paper theme toggle can swap them at runtime.
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        panel: 'rgb(var(--panel-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        a1: 'rgb(var(--a1-rgb) / <alpha-value>)', // coral
        a2: 'rgb(var(--a2-rgb) / <alpha-value>)', // cobalt
        a3: 'rgb(var(--a3-rgb) / <alpha-value>)', // green
        a4: 'rgb(var(--a4-rgb) / <alpha-value>)', // yellow
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        hard: '10px 10px 0 var(--ink)',
        'hard-sm': '6px 6px 0 var(--ink)',
        'hard-lg': '14px 14px 0 var(--ink)',
      },
      borderWidth: {
        3: '3px',
        4: '4px',
      },
      borderRadius: {
        card: '24px',
        chunk: '36px',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        rise: 'rise .5s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
