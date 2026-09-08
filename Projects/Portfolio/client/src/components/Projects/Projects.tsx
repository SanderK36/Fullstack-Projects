import FadeIn from "../FadeIn/FadeIn";
import Project from "../Project/Project";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A full-stack personal portfolio built with React, TypeScript, Express, MongoDB, and Nodemailer.",
      technologies: ["React", "TypeScript", "Express", "MongoDB"],
      image: "/projects/portfolio.png",
      liveUrl: "https://your-live-demo-url.com",
      githubUrl: "https://github.com/yourusername/your-repository",
    },
    {
      title: "Weather App",
      description:
        "A weather application that displays current weather information using an external API.",
      technologies: ["React", "TypeScript", "Express"],
      image: "/projects/weather-app.png",
      liveUrl: "https://your-weather-app-url.com",
      githubUrl: "https://github.com/yourusername/weather-app",
    },
    {
      title: "Task Manager",
      description:
        "A web application for creating and managing daily tasks.",
      technologies: ["React", "TypeScript", "API"],
      image: "/projects/task-manager.png",
      liveUrl: "https://your-task-manager-url.com",
      githubUrl: "https://github.com/yourusername/task-manager",
    },
  ];

  return (
    <section id="projects" className="projects">
      <FadeIn>
        <div className="container">
        <h2>My Projects</h2>

        <div className="projects-list">
          {projects.map((project) => (
            <Project
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
      </FadeIn>
    </section>
  );
}

export default Projects;