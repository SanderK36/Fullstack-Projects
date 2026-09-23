import FadeIn from "../FadeIn/FadeIn";
import Project from "../Project/Project";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Harlow: 1982",
      description:
        "A point-and-click horror game set in 1982, where you play as 20 year old Ethan who tries to uncover the mystery about your sister disappearance",
      technologies: ["React", "Next.js", "CSS",],
      image: "/projects/harlowThumbnail.png",
      liveUrl: "https://harlow-alpha.vercel.app/",
      githubUrl: "https://github.com/yourusername/your-repository",
    },
    {
      title: "Movie search app",
      description:
        "A app where you search for your favorite movies",
      technologies: ["React", "Next.js", "Tailwind CSS"],
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