import ImageCarousel from './ImageCarousel.jsx';

function ProjectCard({
  title,
  status,
  description,
  techStack = [],
  images = [],
  githubUrl,
  demoUrl,
  note
}) {
  return (
    <article className="project">
      <ImageCarousel images={images} label={`${title} screenshots`} />

      <div className="project-body">
        <div className="project-main">
          <h2 className="project-title">
            {title}
            {status && <span className="project-status">{status}</span>}
          </h2>
          <p className="project-description">{description}</p>
        </div>

        <div className="project-side">
          {techStack.length > 0 && (
            <ul className="project-tech">
              {techStack.map((tech) => (
                <li key={tech} className="project-tech-item">{tech}</li>
              ))}
            </ul>
          )}

          {(demoUrl || githubUrl) && (
            <div className="project-links">
              {demoUrl && (
                <a
                  href={demoUrl}
                  className="project-link is-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the site
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the code
                </a>
              )}
            </div>
          )}

          {note && <p className="project-note">{note}</p>}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
