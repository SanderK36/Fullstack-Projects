import Project from "../Project/Project";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website built with React and TypeScript.",
      technologies: ["React", "TypeScript", "CSS"],
      link: "null",
    },
    {
      title: "Weather App",
      description: "A weather application that displays current weather.",
      technologies: ["React", "TypeScript", "Express"],
      link: "null",
    },
    {
      title: "Task Manager",
      description: "A web application for creating and managing daily tasks.",
      technologies: ["React", "TypeScript", "API"],
      link: "null",
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-list">
            {projects.map((project) => (
                <Project
                key={project.title}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                link={project.link}
                />
                ))}
         </div>
    </div>
    </section>
  );
}

export default Projects;
