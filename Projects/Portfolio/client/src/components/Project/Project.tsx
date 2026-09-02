import './Project.css'

type ProjectProps = {
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

function Project({title, description, technologies, link}: ProjectProps) {
    return(
        <article className='project'>
            <h3>{title}</h3>

            <p>{description}</p>

            <div className='technologies'>
                {technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                ))}
            </div>

            <a href={link} target='_blank' rel='noopener noreferrer' className="project-link"> View Project</a>
        </article>
    )
}

export default Project;