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
    },
    {
      title: "Movie search app",
      description:
        "A movie search application for finding your favorite films and discovering something new to watch. Built with React, Next.js, and Tailwind CSS.",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image: "/projects/movieSearchAppThumbnail.png",
      liveUrl: "https://moviescout-beryl.vercel.app/",
    },
    {
      title: "In development",
      description:
        "TBA",
      technologies: ["TBA"],
      image: "/projects/task-manager.png",
      liveUrl: "https://your-task-manager-url.com",
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
            />
          ))}
        </div>
      </div>
      </FadeIn>
    </section>
  );
}

export default Projects;
