import "./Project.css";

type ProjectProps = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
};

function Project({
  title,
  description,
  technologies,
  image,
  liveUrl,
  githubUrl,
}: ProjectProps) {
  return (
    <article className="project">
      <img className="project-image" src={image} alt={`${title} screenshot`}/>

      <div className="project-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <div className="technologies">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>

          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>
        </div>
      </div>
    </article>
  );
}

export default Project;