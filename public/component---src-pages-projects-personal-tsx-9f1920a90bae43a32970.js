"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[431],{1858:function(e,t,a){var r=a(7294),l=a(4160),n=a(3095);t.Z=e=>{let{children:t}=e;const{isDark:a,toggleTheme:o}=(0,n.F)();return r.createElement("div",{className:"min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"},r.createElement("header",{className:"bg-gradient-to-r from-light-gradient-1 to-light-gradient-2 dark:from-dark-gradient-1 dark:to-dark-gradient-2 text-white py-8"},r.createElement("div",{className:"container mx-auto px-4"},r.createElement("div",{className:"flex flex-col items-center"},r.createElement("div",{className:"absolute right-4 top-4"},r.createElement("button",{onClick:o,className:"p-2 rounded-full hover:bg-white/10 transition-colors","aria-label":"Toggle theme"},a?r.createElement("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},r.createElement("path",{d:"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"})):r.createElement("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},r.createElement("path",{d:"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"})))),r.createElement("h1",{className:"text-4xl font-bold mb-4 text-center"},"Jack Bergin"),r.createElement("p",{className:"text-xl mb-6 text-center"},"Full Stack Software Engineer & Robotics Engineer"),r.createElement("nav",{className:"flex justify-center space-x-8"},r.createElement(l.rU,{to:"/",className:"hover:text-blue-300 transition-colors"},"Home"),r.createElement(l.rU,{to:"/projects/professional",className:"hover:text-blue-300 transition-colors"},"Professional Projects"),r.createElement(l.rU,{to:"/projects/personal",className:"hover:text-blue-300 transition-colors"},"Personal Projects"))))),r.createElement("main",{className:"flex-grow container mx-auto px-4 py-8"},t),r.createElement("footer",{className:"bg-gradient-to-r from-light-gradient-1 to-light-gradient-2 dark:from-dark-gradient-1 dark:to-dark-gradient-2 text-white py-8"},r.createElement("div",{className:"container mx-auto px-4 text-center"},r.createElement("div",{className:"flex justify-center space-x-8"},r.createElement("a",{href:"mailto:jack.christopher.bergin@gmail.com",className:"hover:text-blue-300 transition-colors"},r.createElement("i",{className:"fas fa-envelope mr-2"}),"Email"),r.createElement("a",{href:"https://linkedin.com/in/jackcbergin",className:"hover:text-blue-300 transition-colors"},r.createElement("i",{className:"fab fa-linkedin mr-2"}),"LinkedIn"),r.createElement("a",{href:"https://github.com/JackBergin",className:"hover:text-blue-300 transition-colors"},r.createElement("i",{className:"fab fa-github mr-2"}),"GitHub")))))}},3108:function(e,t,a){var r=a(7294);t.Z=e=>{let{projects:t}=e;return r.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},t.map(((e,t)=>r.createElement("a",{key:t,href:e.link,target:"_blank",rel:"noopener noreferrer",className:"block group"},r.createElement("div",{className:"bg-gradient-to-r from-light-gradient-1 to-light-gradient-2  dark:from-dark-gradient-1 dark:to-dark-gradient-2  rounded-lg p-6 h-48 flex flex-col justify-center items-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"},r.createElement("h3",{className:"text-xl font-bold text-white mb-2"},e.title),r.createElement("p",{className:"text-white/80 text-center"},e.description),r.createElement("i",{className:"fab fa-github text-2xl text-white/80 mt-4  group-hover:text-white transition-colors duration-300"}))))))}},3095:function(e,t,a){a.d(t,{F:function(){return o},f:function(){return n}});var r=a(7294);const l=(0,r.createContext)(void 0),n=e=>{let{children:t}=e;const{0:a,1:n}=(0,r.useState)(!1);(0,r.useEffect)((()=>{const e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;n("dark"===e||!e&&t)}),[]),(0,r.useEffect)((()=>{document.documentElement.classList.toggle("dark",a),localStorage.setItem("theme",a?"dark":"light")}),[a]);return r.createElement(l.Provider,{value:{isDark:a,toggleTheme:()=>n(!a)}},t)},o=()=>{const e=(0,r.useContext)(l);if(void 0===e)throw new Error("useTheme must be used within a ThemeProvider");return e}},8638:function(e,t,a){a.r(t),a.d(t,{Head:function(){return c}});var r=a(7294),l=a(3095),n=a(1858),o=a(3108);t.default=()=>r.createElement(l.f,null,r.createElement(n.Z,null,r.createElement("div",{className:"max-w-6xl mx-auto px-4"},r.createElement("h1",{className:"text-3xl font-bold mb-8 text-center"},"Personal Projects"),r.createElement(o.Z,{projects:[{title:"Project 1",description:"Description of project 1",link:"https://github.com/yourusername/project1"}]}))));const c=()=>r.createElement("title",null,"Personal Projects - Jack Bergin")}}]);
//# sourceMappingURL=component---src-pages-projects-personal-tsx-9f1920a90bae43a32970.js.map