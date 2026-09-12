function ContributionCard({ state, repo, number, title, url, description, meta = [] }) {
  return (
    <article className="contribution">
      <div className="contribution-head">
        <span className={`contribution-state state-${state.toLowerCase()}`}>{state}</span>
        <span className="contribution-repo">{repo} #{number}</span>
      </div>

      <h2 className="contribution-title">
        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      </h2>

      <p className="contribution-description">{description}</p>

      {meta.length > 0 && (
        <ul className="contribution-meta">
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default ContributionCard;
