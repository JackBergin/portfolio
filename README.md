<h1 align="center">
  Jack Bergin's Portfolio
</h1>

<p align="center">
  A modern, responsive portfolio built with Gatsby, TypeScript, and Tailwind CSS.
</p>

## 🛠️ Tech Stack

- **Framework**: [Gatsby](https://www.gatsbyjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: Dark/Light mode with system preference detection

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── About.tsx      # About section component
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   ├── ProjectGrid.tsx # Project display grid
│   │   └── Skills.tsx     # Skills section component
│   ├── context/
│   │   └── ThemeContext.tsx # Dark/light theme management
│   ├── pages/
│   │   ├── index.tsx      # Home page
│   │   └── projects/
│   │       ├── personal.tsx   # Personal projects page
│   │       └── professional.tsx # Professional projects page
│   ├── styles/
│   │   └── global.css     # Global styles and Tailwind imports
│   └── types/
│       └── index.ts       # TypeScript type definitions
├── gatsby-config.ts       # Gatsby configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/JackBergin/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run develop
```

Your site will be running at `http://localhost:8000`

## 🎨 Features

- Responsive design that works on all devices
- Dark/Light mode with system preference detection
- Interactive project cards with GitHub links
- Skill categorization with visual hierarchy
- Smooth transitions and animations
- SEO optimized
- TypeScript for type safety
- Tailwind CSS for styling

## 🔧 Customization

1. **Content**: Update the content in the components:
   - `src/components/About.tsx` for your bio
   - `src/components/Skills.tsx` for your skills
   - Project pages for your projects

2. **Styling**: Modify the theme in:
   - `tailwind.config.js` for color schemes
   - `src/styles/global.css` for global styles

3. **Layout**: Adjust the layout in:
   - `src/components/Layout.tsx` for page structure
   - Individual components for specific sections

## 🤝 Contact

- Email: jack.christopher.bergin@gmail.com
- LinkedIn: [jackcbergin](https://linkedin.com/in/jackcbergin)
- GitHub: [JackBergin](https://github.com/JackBergin)
