import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Operating Systems",
      items: ["Ubuntu", "CentOS", "Windows", "macOS"]
    },
    {
      title: "Languages",
      items: ["Python", "Java", "JavaScript", "TypeScript", "C++"]
    },
    {
      title: "Web Technologies",
      items: ["HTML", "CSS", "Tailwind CSS", "REST APIs"]
    },
    {
      title: "Frameworks & Libraries",
      items: ["React", "Next.js", "Gatsby", "Node.js", "Express"]
    },
    {
      title: "Cloud Computing",
      items: ["AWS", "GCP", "Azure", "Ngrok"]
    },
    {
      title: "Databases",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Snowflake"]
    },
    {
      title: "DevOps",
      items: ["Docker", "Kubernetes", "Proget"]
    },
    {
      title: "Version Control",
      items: ["Git", "GitLab", "CI/CD Pipelines"]
    },
    {
      title: "Project Management",
      items: ["Jira", "Agile", "Kanban"]
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <div 
            key={index}
            className="bg-gradient-to-r from-light-gradient-1 to-light-gradient-2 
                     dark:from-dark-gradient-1 dark:to-dark-gradient-2 
                     rounded-lg p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-4 text-center border-b border-white/20 pb-2">
              {category.title}
            </h3>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li 
                  key={itemIndex}
                  className="flex items-center before:content-['•'] before:mr-2 before:text-blue-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 