import Layout from '../components/Layout.jsx';
import StatsCard from '../components/StatsCard.jsx';
import ContributionCard from '../components/ContributionCard.jsx';
import '../css/opensource.css';

function OpenSource() {
  const statsData = [
    { number: 8, label: "Pull Requests" },
    { number: 5, label: "Issues Opened" },
    { number: 4, label: "Repositories" },
    { number: 42, label: "Commits" }
  ];

  const contributionsData = [
    {
      type: "PR",
      number: "92",
      status: "MERGED",
      repo: "open-ug/conveyor",
      title: "Integrated BadgerDB as Log Storage Backend.",
      url: "https://github.com/open-ug/conveyor/pull/92",
      description: "Integrated BadgerDB as the backend for structured log storage in the Conveyor API server. This feature enables persistence in log data, enabling reliable storage and retrieval for better app observability",
      meta: [
        { label: "Language", value: "Go" },
        { label: "Lines", value: "+426 -24" },
        { label: "Files", value: "9" }
      ]
    },
    {
      type: "PR",
      number: "1274",
      status: "MERGED",
      repo: "openfn/adaptors",
      title: "Improve SQL Adaptors",
      url: "https://github.com/OpenFn/adaptors/pull/1274",
      description: "Introduced a new function to the MySQL adaptor, matching the signature and behavior of the PostgreSQL adaptor's function. This change improves developer experience by ensuring consistency in the SQL adaptors",
      meta: [
        { label: "Language", value: "TypeScript" },
        { label: "Impact", value: "High" },
        { label: "Reproduced", value: "Yes" }
      ]
    },
    {
      type: "PR",
      number: "33825",
      status: "OPEN",
      repo: "mattermost/mattermost",
      title: "Fix Race Condition when Sending Concurrent Replies",
      url: "https://github.com/mattermost/mattermost/pull/33825",
      description: "fixes race condition bug when sending multiple replies to threads. This change ensures system reliability by allowing multiple users to post replies at the same time without risk of errors",
      meta: [
        { label: "Language", value: "Go" },
        { label: "Lines", value: "+210 -10" },
        { label: "Bug", value: "Fixed" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="main-page">
        <div className="page-header">
          <h1 className="page-title">Opensource</h1>
          <p className="page-subtitle">Community contributions and open source involvement</p>
        </div>

        <div className="response-container">

          <div className="stats-section">
            <div className="stats-title">contribution_summary</div>
            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <StatsCard 
                  key={index}
                  number={stat.number} 
                  label={stat.label} 
                />
              ))}
            </div>
          </div>

          <div className="contributions-list">
            {contributionsData.map((contribution, index) => (
              <ContributionCard
                key={index}
                type={contribution.type}
                number={contribution.number}
                status={contribution.status}
                repo={contribution.repo}
                title={contribution.title}
                url={contribution.url}
                description={contribution.description}
                meta={contribution.meta}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OpenSource;

